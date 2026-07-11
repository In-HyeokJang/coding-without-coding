# 사이트에 해둔 신기한(?) 기능들 정리

이번에 디자인 리모델링 하면서 같이 넣은 것들. 이 파일 하나만 보고도 무슨 일이 있었는지, 다른 프로젝트에 그대로 옮겨 쓰려면 뭘 어디에 넣어야 하는지 알 수 있게 코드까지 같이 적어둠.

**이 프로젝트 스택:** Astro + Starlight(문서 사이트 프레임워크) + GitHub Pages(정적 호스팅, 서버 없음) + GitHub Actions(자동화)

아래 6번(날짜 자동 공개)만 **어떤 정적 사이트/프레임워크든 그대로 이식 가능**. 나머지는 Starlight 전용 기능.

---

## 1. 디자인 테마

- 색상: 차가운 파랑 → 코랄 톤 + 웜 그레이로 전체 교체
- 폰트: Pretendard Variable (한글 웹서비스에서 요즘 많이 쓰는 폰트, CDN에서 불러옴)
- 홈 히어로 제목 그라디언트, 카드형 박스, 표/코드블록/안내문 라운드 처리
- 실제 파일: `src/styles/custom.css` (전체 250줄 정도)

**연결하는 법** (`astro.config.mjs`):
```js
starlight({
  customCss: ['./src/styles/custom.css'],
  head: [
    { tag: 'link', attrs: { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: true } },
  ],
  // ...
})
```

다른 프로젝트에 색만 옮기고 싶으면 `custom.css` 맨 위 `:root` / `:root[data-theme='light']` 블록의 `--sl-color-*` 변수들만 가져가면 됨 (Starlight 전용 변수명이라 다른 프레임워크면 이름은 다시 맞춰야 함).

## 2. mermaid 다이어그램도 색 맞춤

```js
// astro.config.mjs
mermaid({
  theme: 'forest',
  autoTheme: true, // 라이트/다크 자동 전환
  mermaidConfig: {
    themeVariables: {
      primaryBorderColor: '#e8562e',
      lineColor: '#e8562e',
      clusterBorder: '#e8562e',
      clusterBkg: 'rgba(232, 86, 46, 0.08)',
    },
  },
}),
```

## 3. 표(table) 칸 균등 분배 — 어디든 이식 가능한 CSS 트릭

기본 HTML 표는 `table-layout: auto`라서 넓은 화면에서 남는 공간을 칸 하나(보통 마지막 칸)에 몰아줘서 그 칸만 텅 비어 보이는 문제가 있었음. 이렇게 고침:

```css
table {
  width: 100%;
  table-layout: fixed; /* 핵심: auto는 칸 폭이 들쭉날쭉해짐 */
}
th {
  width: 1%; /* 모든 th에 "같은" 값을 주면 칸 수 상관없이 폭이 균등하게 나뉜다 */
}
```

## 4. `draft: true` — 페이지를 통째로 숨기기 (Starlight 내장 기능)

프론트매터에 이거 한 줄:
```md
---
title: 2회차 · 설계
draft: true
---
```

- 사이드바 목록에서 자동으로 빠짐
- **프로덕션 빌드 자체에 아예 안 들어감** → 그 페이지 URL을 직접 쳐도 404
- 로컬 개발 서버(`npm run dev`)에서는 계속 보임 (초안 작업용)

JS로 화면에서 숨기는 게 아니라 애초에 빌드에서 빼버리는 거라 훨씬 확실한 방식. Starlight 아닌 다른 프레임워크는 이 기능이 없을 수 있음 — 그땐 6번의 GitHub Actions 스크립트만 있으면 되고, "숨기는 방법"은 그 프레임워크에 맞는 걸 따로 찾아야 함.

## 5. 사이드바 자동 생성 (`autogenerate`, Starlight 전용)

회차 6개를 설정 파일에 일일이 나열하면, `draft: true`인 페이지를 사이드바가 계속 참조해서 **빌드가 아예 깨짐** (실제로 겪은 에러: `The slug ... specified in the Starlight sidebar config does not exist`).

```js
// astro.config.mjs
sidebar: [
  {
    label: '회차',
    items: [{ autogenerate: { directory: 'sessions' } }], // 이렇게 바꾸면 해결
  },
]
```

`sessions/` 폴더 안의 draft 아닌 페이지만 자동으로, 파일명 순서대로 사이드바에 나열됨. 새 회차 추가할 때 설정 파일 안 건드려도 됨.

## 6. 회차별 날짜 자동 공개 ⭐ (제일 신기한 거, 어디든 이식 가능)

정적 사이트는 서버가 없어서 "이 날짜 되면 자동으로 보여줘"를 하려면 꾀를 좀 내야 함. 원리는 간단함:

> **매일 새벽에 로봇이 파일을 읽어서, 오늘 열어야 할 게 있으면 직접 파일을 고쳐서 커밋·푸시한다.**

### 4단계

1. 공개할 페이지 프론트매터에 숨김 처리 + 공개일을 적어둔다
   ```md
   ---
   title: 2회차 · 설계
   draft: true
   openDate: '2026-07-29'
   ---
   ```
2. `.github/workflows/auto-open-sessions.yml` 이 **매일 00:05(한국 시간)** 자동 실행
3. 모든 페이지를 훑어서, 오늘 날짜가 `openDate` 이상이고 아직 `draft: true`인 파일을 찾으면 그 줄을 지우고 **자동으로 커밋 + 푸시**
4. 푸시되면 원래 있던 배포 워크플로우(`deploy.yml`)가 이어서 돌면서 사이트가 재배포됨

→ 컴퓨터를 꺼놔도, 아무것도 안 해도, 날짜 되면 알아서 열림.

### 그대로 복붙 가능한 워크플로우 파일

```yaml
# .github/workflows/auto-open-sessions.yml
name: Auto-open sessions by date

on:
  schedule:
    - cron: '5 15 * * *' # 15:05 UTC = 00:05 KST(다음날)
  workflow_dispatch: # Actions 탭에서 수동 실행 버튼도 생김

permissions:
  contents: write # 로봇이 커밋/푸시하려면 필요

jobs:
  open-sessions:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - name: 오늘 날짜(KST) 기준으로 draft 해제
        id: open
        run: |
          TODAY=$(TZ=Asia/Seoul date +%Y-%m-%d)
          CHANGED=0
          # 아래 경로/패턴만 프로젝트에 맞게 바꾸면 됨
          for f in src/content/docs/sessions/*.md src/content/docs/sessions/*.mdx; do
            [ -f "$f" ] || continue
            OPEN_DATE=$(grep -m1 -oE "^openDate: *['\"]?[0-9]{4}-[0-9]{2}-[0-9]{2}" "$f" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)
            IS_DRAFT=$(grep -m1 -oE '^draft: *true' "$f" || true)
            if [ -n "$OPEN_DATE" ] && [ -n "$IS_DRAFT" ] && [ "$OPEN_DATE" \< "$TODAY" -o "$OPEN_DATE" = "$TODAY" ]; then
              sed -i '/^draft: *true$/d' "$f"
              CHANGED=1
            fi
          done
          echo "changed=$CHANGED" >> "$GITHUB_OUTPUT"

      - name: 변경됐으면 커밋 & 푸시
        if: steps.open.outputs.changed == '1'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add src/content/docs/sessions/
          git commit -m "회차 자동 공개 (날짜 도달)"
          git push
```

### ⚠️ 함정이었던 것: 기본 브랜치 (다른 프로젝트에서도 꼭 확인)

GitHub Actions의 `schedule`(cron) 트리거는 **저장소의 기본 브랜치에서만** 동작한다. 이 저장소는 처음 만들 때 GitHub이 자동으로 만든 `master`가 기본 브랜치로 남아있었는데, 실제 작업은 전부 `main`에서 했었음 — 그대로 뒀으면 cron이 영원히 안 도는데, push 배포는 브랜치 상관없이 잘 되니까 겉으로는 문제가 안 보여서 더 헷갈렸음.

**다른 프로젝트에 이 방식 쓸 때 체크리스트:**
- [ ] 저장소 Settings → General → Default branch 가 실제로 작업하는 브랜치와 같은지 확인
- [ ] 다르면 바꾸기 (저장소 소유자/관리자 권한 필요, GitHub 웹 UI에서만 가능 — API 토큰으론 막혀 있는 경우가 많음)
- [ ] 워크플로우에 `permissions: contents: write` 빠뜨리지 않기 (없으면 push 403 에러)
- [ ] `workflow_dispatch` 넣어두면 cron 시간 기다릴 필요 없이 Actions 탭에서 수동 테스트 가능

### 지금 이 프로젝트에 잡혀 있는 날짜

| 회차 | 공개일 |
|---|---|
| 1회차 | (이미 공개, draft 없음) |
| 2회차 | 2026-07-29 |
| 3회차 | 2026-08-04 |
| 4회차 | 2026-08-05 |
| 5회차 | 2026-08-11 |
| 6회차 | 2026-08-12 |

시즌 2 준비할 때: 새 회차 파일에 `draft: true` + `openDate: 'YYYY-MM-DD'`만 넣어두면 이 워크플로우가 그대로 재사용됨. 코드 수정 필요 없음.

---

*작성: 2026-07-11 · 디자인 리모델링 + 날짜 자동 공개 작업하면서 정리*
