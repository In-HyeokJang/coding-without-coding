# Claude Code 킥오프 프롬프트

> 순서대로 하나씩. 한 번에 다 붙여넣지 마세요.
> 하나 끝나면 `git commit` 하고 다음으로.

---

## Day 0 · Codespaces 준비 (30분)

### 저장소 만들기

github.com → 오른쪽 위 `+` → **New repository**

| 칸 | 값 |
|---|---|
| Repository name | `coding-without-coding` |
| 설명 | 광명시 청년 바이브코딩 커뮤니티 가이드 |
| 공개 | **Public** |
| Add a README file | **체크** |

### Codespaces 열기

저장소 → 초록색 `< > Code` → **Codespaces** 탭 → **Create codespace on main**

1~2분 기다리면 브라우저 안에 VSCode가 열립니다.

### 확인

터미널에서:
```bash
node -v
git --version
```

둘 다 버전이 나오면 준비 끝.

### 파일 올리기

받은 파일들을 왼쪽 파일 목록에 **드래그 앤 드롭**. 폴더째로 끌어도 됩니다.

```
coding-without-coding/
├── README.md          ← GitHub이 만든 것 위에 덮어쓰기
├── CHANGELOG.md
├── CLAUDE.md
├── core/
│   ├── 01-tools.md
│   ├── 02-prompting.md
│   └── 03-token-setup.md
└── sessions/
    ├── session-1-idea.md
    ├── session-2-design.md
    ├── session-3-skeleton.md
    ├── session-4-feature.md
    ├── session-5-polish.md
    └── session-6-deploy.md
```

### 첫 커밋

```bash
git add .
git commit -m "원본 문서 11개"
git push
```

**사이트 만들기 전에 원본을 먼저 커밋합니다.**
나중에 "AI가 다 바꿔놨는데 원래 뭐였지"를 막아줍니다.

### Claude Code 설치

```bash
npm install -g @anthropic-ai/claude-code
claude
```

로그인 화면이 뜨면 Claude Pro/Max 계정으로.

> 명령어가 안 되면 최신 설치 방법을 확인하세요.

---

## Day 1 · Starlight 세우기 (2시간)

### 1-1. 상황 설명 (제일 먼저)

```
이 폴더에 md 파일 11개가 있어. 커뮤니티 참가자용 가이드 문서야.
CLAUDE.md 를 먼저 읽어줘.

이걸 Astro Starlight 문서 사이트로 만들어서 GitHub Pages에 배포하려고 해.

지금은 아무것도 만들지 마.
먼저 지금 폴더에 뭐가 있는지 확인하고, 어떤 순서로 작업할지 계획만 알려줘.
```

> **왜 계획부터?** AI가 바로 파일을 만들면 뭘 하는지 모른 채 끌려갑니다.
> 계획을 먼저 보고 "이건 빼자"를 말할 수 있어야 해요.

### 1-2. Starlight 설치

```
Astro Starlight 프로젝트를 이 폴더에 설치해줘.

주의:
- 기존 md 파일 11개를 덮어쓰지 마
- 설치 명령어는 지금 공식 문서 기준으로 확인해서 알려주고, 실행 전에 나한테 보여줘
- TypeScript는 안 쓸래. 가장 단순한 설정으로

설치가 끝나면 로컬 서버를 띄워서 화면이 뜨는지 확인해줘.
```

**Codespaces에서 서버가 뜨면** 오른쪽 아래에 "포트가 열렸다"는 알림이 뜹니다.
**Open in Browser** 를 누르면 새 탭에서 사이트가 열려요.

아직 우리 문서는 안 보입니다. Starlight 기본 화면이 뜨면 성공.

```bash
git add .
git commit -m "Starlight 설치"
```

### 1-3. 문서 옮기기

```
이제 기존 md 11개를 Starlight 안으로 옮겨줘.

구조:
- README.md → src/content/docs/index.mdx (홈)
- core/ 3개 → src/content/docs/core/
- sessions/ 6개 → src/content/docs/sessions/
- CHANGELOG.md → src/content/docs/changelog.md

파일명은 그대로 두고, 각 파일 맨 위에 frontmatter로 한글 title 을 넣어줘.
예: session-3-skeleton.md 의 title 은 "3회차 · 뼈대"

중요: 본문 내용은 바꾸지 마. 위치와 frontmatter만.
한 번에 하나씩 옮기고, 하나 끝나면 알려줘.
```

### 1-4. 사이드바

```
astro.config.mjs 에 사이드바를 설정해줘.

순서:
1. 시작하기 (홈)
2. 준비
   - 도구 6종 (core/01-tools)
   - 프롬프트 가이드 (core/02-prompting)
   - 토큰 절약 설정 (core/03-token-setup)
3. 회차
   - 1회차 · 아이디어 ~ 6회차 · 배포
4. 변경 기록

사이트 제목은 "코딩 없이 코딩" 으로.
사이드바 그룹 제목은 한글로.
```

**Day 1 끝.** 로컬에서 사이트를 돌아다닐 수 있으면 성공.

```bash
git add .
git commit -m "문서 이전 + 사이드바 구성"
git push
```

---

## Day 2 · 시각화 (2시간)

### 2-1. 다이어그램 준비

```
Starlight에서 Mermaid 다이어그램을 쓰려면 뭘 설치해야 해?
지금 공식 문서 기준으로 확인하고, 설치하기 전에 방법을 먼저 설명해줘.
```

### 2-2. 다이어그램 4개 — **하나씩!**

**절대 한 번에 4개 시키지 마세요.** 컨텍스트가 터지고, 어느 게 이상한지 못 찾습니다.

**① 도구 흐름도**
```
core/01-tools.md 에 아스키 아트로 그려둔 흐름도가 있어.
그걸 Mermaid 다이어그램으로 바꿔줘.

"내 노트북" 과 "인터넷" 두 덩어리로 나누고,
화살표에 몇 회차인지 표시해줘.
```

확인하고 커밋. 그다음.

**② 6회차 진행 곡선**
```
홈(index.mdx)에 6회차 진행 곡선을 Mermaid로 그려줘.

1회차부터 6회차까지 감정 강도가 이렇게 움직여:
3 → 4 → 6 → 5 → 7 → 10

4회차가 유일하게 내려가는 지점이야. 그게 눈에 보여야 해.
각 회차 아래에 소재(아이디어/설계/뼈대/기능/다듬기/배포)를 적어줘.
```

**③ 4회차 도달 3갈래**
```
sessions/session-4-feature.md 에 "도달 지점 3갈래" 표가 있어.
그걸 Mermaid 다이어그램으로 바꿔줘.

셋 다 정상이라는 게 보여야 해. 위아래 서열처럼 보이면 안 돼.
```

**④ 결과물 타임라인**
```
홈에 결과물 타임라인을 Mermaid로 그려줘.
빈 폴더 → 페이지 목록 → 로컬 화면 → 기능 하나 → 완성 → 라이브 URL
```

### 2-3. 탭

```
sessions/session-1-idea.md 에서 Claude Code 와 Codex 설치 안내가 나란히 있어.
Starlight의 탭 기능으로 바꿔줘. 자기 것만 보이게.
```

### 2-4. 경고 박스

```
sessions/session-4-feature.md 맨 위에 있는 "가장 어려운 회차" 경고를
Starlight의 aside(danger) 로 바꿔줘.

그리고 sessions/session-6-deploy.md 의 "에러의 90%가 여기서" 부분도
aside(caution) 으로.
```

```bash
git add .
git commit -m "시각화 4개 + 탭 + 경고박스"
git push
```

---

## Day 3 · GitHub Pages 배포 (1시간)

### 3-1. 워크플로우

```
GitHub Pages로 배포하려고 해.

GitHub Actions 워크플로우를 만들어줘.
main 브랜치에 푸시하면 자동으로 빌드되고 배포되게.

astro.config.mjs 의 site 와 base 설정도 GitHub Pages 주소에 맞게 고쳐줘.
저장소 이름은 coding-without-coding 이야.

주의: 설정을 바꾸기 전에 뭘 왜 바꾸는지 먼저 설명해줘.
```

### 3-2. GitHub 설정

저장소 → **Settings** → 왼쪽 **Pages** → Source를 **GitHub Actions** 로.

### 3-3. 푸시하고 기다리기

```bash
git add .
git commit -m "GitHub Pages 배포 설정"
git push
```

저장소 → **Actions** 탭에서 초록불이 뜰 때까지 2~3분.

### 3-4. 확인

```
https://[내아이디].github.io/coding-without-coding
```

**주소가 뜨면 끝.**

---

## 막혔을 때

```
이 명령어를 실행했는데 에러가 났어:
[명령어]

에러 메시지야:
[처음 5줄 붙여넣기]

뭐가 문제인지, 뭘 확인해야 하는지 알려줘.
```

---

## Codespaces 주의사항

- **30분 안 쓰면 자동으로 멈춥니다.** 파일은 안 날아가요. 저장소 → Code → Codespaces에서 다시 열면 그대로입니다
- **그래도 커밋은 자주 하세요.** 그게 진짜 안전장치입니다
- 무료 사용 시간이 매달 정해져 있습니다. 계정 설정에서 확인하세요

---

## 토큰 아끼기

- **Day가 바뀌면 `/clear`**
- **30분마다 `/context`** — 50% 넘으면 정리
- **한 번에 하나씩** — 이게 제일 큰 절약

---

## 커밋 메시지 규칙

6회차에 참가자들한테 이 저장소를 보여줄 겁니다.
**커밋 로그가 곧 포트폴리오예요.**

좋음:
```
Starlight 설치
문서 11개 이전
도구 흐름도 Mermaid로 변환
4회차 도달 지점 다이어그램 추가
GitHub Pages 배포 설정
```

나쁨:
```
fix
update
수정
asdf
```

**뭘 했는지 적으세요.**
