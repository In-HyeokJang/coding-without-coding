# 인수인계 · 다른 PC에서 이어서 하기

> **마지막 작업일:** 2026-08-10
> **이 파일을 먼저 읽고 시작하세요.** 사이트에는 배포되지 않습니다.

---

## 1. 새 PC에서 처음 할 것

```
git clone https://github.com/In-HyeokJang/coding-without-coding.git
cd coding-without-coding
git checkout dev
npm install
```

**작업은 `dev` 브랜치에서 합니다.** 아래 "지켜야 할 규칙" 을 꼭 보세요.

그다음 이 폴더를 Claude Code 로 열고 **`/cwc-next`** 를 치면 이어서 진행됩니다.

### 확인할 것

| 확인 | 어떻게 |
|---|---|
| 개발 서버 | `npm run dev` → `localhost:4321` |
| 빌드 | `npm run build` |
| 스킬이 뜨는지 | Claude Code 에서 `/cwc-next` 입력 |

> **참고 ·** `npm run build` 는 **Windows 에서 마지막 Pagefind 단계에 크래시**합니다.
> `platform windows-x64 is not yet a supported architecture` — 알려진 환경 문제이고,
> 정적 페이지 생성은 그 전에 끝납니다. **배포(우분투)에서는 안 납니다.**
>
> `localhost:4321` 은 **이 안내 사이트**의 주소입니다. 회차 문서에 나오는 `localhost:3000` 은
> 참가자가 만드는 Next.js 사이트 주소라 서로 다릅니다.

---

## 2. 지켜야 할 규칙 (제일 중요)

### `main` 은 사용자가 직접 올립니다

**작업은 `dev` 에만 커밋·push 합니다. `main` 으로 checkout·병합·push 하지 않습니다.**

WBS 에 "main 반영" 이 적혀 있어도 실행하지 말고, 준비가 끝났다고 알리기만 하세요.

> 2026-08-10 에 이 규칙을 정하기 전에 한 번 `main` 에 병합·push 한 일이 있었습니다.
> 사용자가 그대로 두기로 해서 되돌리지 않았지만, 그 뒤로는 이 규칙을 지킵니다.

### 검증 없이 완료 처리하지 않습니다

`WBS.md` 순서대로 진행하고, **검증 팀을 거친 것만** ✅ 로 바꿉니다.

| 팀원 | 언제 부르나 |
|---|---|
| `doc-guard` | 문서 글을 고쳤을 때 |
| `newbie-sim` | 회차 문서를 고쳤을 때 |
| `fact-check` | 외부 서비스(Vercel·Supabase) 안내를 고쳤을 때 |
| `build-check` | 빌드·링크·워크플로를 건드렸을 때 |

**팀 지적을 고친 뒤에는 같은 팀원에게 다시 확인시킵니다.** 한 번 고치고 통과로 넘기지 않습니다.

같은 항목에서 세 번 막히면 원인을 `WBS.md` "막힌 기록" 표에 적고 넘어갑니다.

### 진행 중인 채로 끝내지 않습니다

`WBS.md` 에 🔄 가 남은 채 턴을 끝내면 **Stop 훅이 막습니다.**

훅은 `.claude/hooks/wbs-check.ps1` 이고 **PowerShell 이라 Windows 전용**입니다.
새 PC 가 Mac·Linux 면 `.claude/settings.json` 의 `command` 를 그 환경에 맞게 바꿔야 합니다.

---

## 3. 지금 상태

### 일정

| 회차 | 모임일 |
|---|---|
| 5회차 · 다듬기 | 2026-08-11 |
| 6회차 · 배포 | 2026-08-12 |

**회차 문서는 전부 열려 있습니다.** 참가자가 언제 오든 1~6회차를 다 볼 수 있게 하려고 2026-08-11 에 상시 공개로 바꿨습니다.

날짜가 되면 `draft` 를 풀어주던 `auto-open-sessions.yml` 은 그때 지웠습니다. 기법 자체는 `site-notes.md` 6번에 기록으로 남겨뒀어요.

> **다시 그런 걸 만들 거면 함정 하나.** 워크플로가 기본 `GITHUB_TOKEN` 으로 푸시하면 **다른 워크플로가 트리거되지 않습니다.**
> 그래서 8/11 아침에 `main` 의 draft 는 풀렸는데(`b1d71d9`) 배포가 안 돌아 5·6회차가 사이트에서 404 였습니다.

### 오늘(8/10) 한 일

- 5·6회차를 같은 날 아침에 공개하도록 변경
- 6회차 배포 순서를 실제 Vercel 화면에 맞게 5단계로 재구성 (+ Redeploy 안내)
- 타임캡슐 개봉 실패 안내 버그 수정 (서버 오류를 참가자 오타로 오인시키던 것)
- 1~6회차 "오기 전에" 절 전부 제거 (문서를 미리 공유하지 않기로 함)
- 5·6회차 말투 전면 손질 (싸우는 말·진도 노출 제거)
- 5회차에 디자인 단계 신설 + `DESIGN.md` 실전 사용법 보강
- 팀 4명 전체 검증 → **Supabase GRANT 문제** 등 발견·수정
- ASCII 그림 6곳 제거, 문서 간 불일치 정리

자세한 건 `src/content/docs/changelog.md` 의 `[2.3] · 2026-08-10` 절에 있습니다.

### 브랜치

- `dev` — 최신
- `main` — 사용자가 PR 로 올립니다 (#12 까지 반영됨)

---

## 4. 남은 작업

`WBS.md` 의 **"▶ 지금 할 것"** 이 다음 작업입니다. 현재 남은 건 **전부 사람이 직접 확인해야 하는 항목**입니다.

### 회차 전에 (진행자)

- **S6-5** · Supabase 프로젝트를 한 번 열어 깨워두기. 무료 플랜은 요청이 없으면 잠들어서 첫 조회가 실패할 수 있습니다 (1회차 봉인 이후 약 2주 무요청)
- **S6-6** · 진행자용 타임캡슐 개봉 경로 리허설. 문서는 "기억 안 나면 진행자에게" 라고 약속하는데 코드에는 수단이 없습니다. Supabase → Table Editor → `time_capsules` 에서 직접 찾는 절차를 미리 해볼 것
- **V-11** · 6회차 현장에서 Vercel 의 `Add Another` 버튼 문구를 눈으로 확인

### 급하지 않은 것

- **FIX-3 · FIX-4** · 배포 워크플로 로그에서 Pagefind·404 경고 확인
- **V-14** · 3열 표 9개를 2열로 (칸 안 문장이 짧아 당장 깨지진 않음)

---

## 5. 환경 변수

타임캡슐이 Supabase 를 씁니다. **저장소에 `.env` 는 없습니다.**

| 이름 | 어디에 있나 |
|---|---|
| `PUBLIC_SUPABASE_URL` | GitHub 저장소 Settings → Secrets |
| `PUBLIC_SUPABASE_ANON_KEY` | 같은 곳 |

배포는 `.github/workflows/deploy.yml` 이 빌드할 때 주입합니다.

**로컬에서 타임캡슐을 실제로 테스트하려면** 프로젝트 루트에 `.env` 를 만들어 두 줄을 넣으세요. 없어도 문서 작업에는 지장 없습니다.

> ⚠️ **`.env` 는 절대 커밋하지 마세요.** `.gitignore` 에 들어 있지만, 확인하고 넘어가세요.

---

## 6. 파일 지도

| 어디 | 뭔가 |
|---|---|
| `WBS.md` | **작업 순서의 원본.** 여기부터 보세요 |
| `CLAUDE.md` | 문서 작성 규칙 (말투·중복·강조·가독성) |
| `src/content/docs/sessions/` | 1~6회차 참가자용 문서 |
| `src/content/docs/core/` | 준비 문서 8개 |
| `src/content/docs/changelog.md` | 변경 기록 (draft, 배포 안 됨) |
| `src/components/TimeCapsule.astro` | 타임캡슐 봉인·개봉 |
| `.claude/agents/` | 검증 팀 4명 |
| `.claude/skills/cwc-next/` | 작업 재개 스킬 |
| `.claude/hooks/wbs-check.ps1` | 체크 누락 방지 훅 |
| `site-notes.md` | 개발하며 남긴 내부 메모 |
