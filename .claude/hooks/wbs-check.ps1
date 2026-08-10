# WBS 체크 누락 방지 훅 (Stop 훅)
#
# WBS.md 에 🔄(하는 중) 상태로 남은 항목이 있으면 턴을 끝내지 못하게 막는다.
# 검증까지 통과했는데 ✅ 로 바꾸는 걸 잊고 넘어가는 일을 막기 위한 것.
#
# 통과 조건: 🔄 인 항목이 하나도 없음
# 막을 때: exit 2 + stderr — stderr 내용이 Claude에게 그대로 전달된다.

$ErrorActionPreference = 'Stop'

# 한글이 깨지지 않게. 이 파일 자체도 UTF-8 BOM 으로 저장해야 한다 (PS 5.1 이 ANSI 로 읽어버린다)
try { [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false) } catch {}

# --- 입력 읽기 (Stop 훅은 stdin으로 JSON을 준다) ---
$raw = [Console]::In.ReadToEnd()
if ($raw) {
	try {
		$payload = $raw | ConvertFrom-Json
		# 이미 이 훅 때문에 한 번 막힌 상태면 또 막지 않는다 (무한 루프 방지)
		if ($payload.stop_hook_active -eq $true) { exit 0 }
	} catch {
		# JSON 이 아니어도 검사는 계속한다
	}
}

# --- WBS 파일 찾기 ---
$root = $env:CLAUDE_PROJECT_DIR
if (-not $root) { $root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot) }
$wbs = Join-Path $root 'WBS.md'
if (-not (Test-Path $wbs)) { exit 0 }

# --- 🔄 표시 (PS 5.1 에서 안전하게 서로게이트 쌍으로 만든다) ---
$running = [string]([char]0xD83D) + [string]([char]0xDD04)

# 항목 행만 본다. 두 번째 칸이 ID(대문자-숫자) 인 행.
# 맨 위 "상태 표시" 범례 표는 여기 걸리지 않는다.
$pattern = '^\|\s*' + [regex]::Escape($running) + '\s*\|\s*[A-Z]+-\d+\s*\|'

$stuck = @(Get-Content -LiteralPath $wbs -Encoding UTF8 | Where-Object { $_ -match $pattern })

if ($stuck.Count -eq 0) { exit 0 }

# --- 막는다 ---
$ids = @($stuck | ForEach-Object {
	if ($_ -match '\|\s*([A-Z]+-\d+)\s*\|') { $Matches[1] }
}) -join ', '

$msg = @"
[WBS 훅] 아직 '하는 중' 으로 남은 항목이 있습니다: $ids

넘어가기 전에 이걸 끝내주세요.

1. 검증 팀 회의를 마쳤나요? ([심각]/[막힘]/[틀림]/[실패] 를 다 고쳤는지)
2. 통과했으면 WBS.md 에서 그 항목을 [하는 중] -> [완료] 로 바꾸고,
   '지금 할 것' 을 다음 항목으로 옮기고, '완료 기록' 표에 한 줄 추가하세요.
3. 고친 파일과 WBS.md 를 함께 커밋하세요.
4. 세 번 막혀서 넘어가는 경우라면 [넘어감] 으로 바꾸고 '막힌 기록' 표에 원인을 적으세요.

아직 작업이 안 끝났다면 이어서 진행하시면 됩니다.
"@

[Console]::Error.WriteLine($msg)
exit 2
