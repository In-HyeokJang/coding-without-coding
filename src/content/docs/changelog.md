---
title: 변경 기록
---

이 문서를 고칠 때마다 여기 한 줄씩 남깁니다.
**날짜 · 뭘 바꿨는지 · 왜 바꿨는지** 세 가지만 적으면 됩니다.

---

## [1.0] · 2026-07-10

### 처음 만듦

- `core/01-tools.md` — Node.js, VSCode, Claude Code/Codex, GitHub, Supabase, Vercel
- `core/02-prompting.md` — 프롬프트 4원칙 + 회차별 템플릿 + 에러 대응
- `core/03-token-setup.md` — CLAUDE.md 작성법, `/clear` `/compact` `/context` 사용법
- `sessions/` — 1~6회차 참가자용 안내
- 시즌 1 기준으로 작성

### 확인한 것 (2026-07-10 기준)

- Claude Code 설치: `npm install -g @anthropic-ai/claude-code`
- Claude Code 슬래시 명령어: `/context` `/compact` `/clear` `/stats` `/init` `/model` 확인됨
- CLAUDE.md는 `/compact` 후에도 자동으로 다시 읽힘 (프로젝트 루트 기준)

---

## 앞으로 적을 자리

```
## [1.1] · YYYY-MM-DD

- `sessions/4회차` — Supabase 테이블 만드는 화면 위치가 바뀌어서 수정
- `core/02` — "에러 났을 때" 프롬프트에 예시 하나 추가
```

---

## 확인이 필요한 것들 (다음 시즌 전에)

시간이 지나면 사실이 아닐 수 있는 것들입니다. 시즌 시작 전 체크리스트를 돌 때 같이 확인하세요.

- [ ] Claude Code 설치 명령어와 로그인 방식
- [ ] Codex CLI 설치 명령어와 로그인 방식
- [ ] Supabase 무료 플랜의 프로젝트 개수 제한, 휴면 정책
- [ ] Vercel 무료 플랜의 배포 제한
- [ ] Node.js LTS 버전 번호
- [ ] Next.js 프로젝트 생성 명령어
