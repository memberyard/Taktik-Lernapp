# ============================================================
# TAKTIK LERNAPP — Deploy zu GitHub + Vercel
# Einmal ausführen: Rechtsklick → "Mit PowerShell ausführen"
# ============================================================

$PAT  = "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"
$REPO = "https://$PAT@github.com/memberyard/Taktik-Lernapp.git"
$DIR  = Split-Path -Parent $MyInvocation.MyCommand.Path

# ── Schritt 1: Git prüfen / installieren ─────────────────
Write-Host ""
Write-Host "▶ Prüfe ob Git installiert ist..." -ForegroundColor Cyan

$gitPath = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitPath) {
    Write-Host "  Git nicht gefunden. Versuche Installation über winget..." -ForegroundColor Yellow
    winget install --id Git.Git -e --source winget --silent

    # PATH neu laden
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    $gitPath = Get-Command git -ErrorAction SilentlyContinue
    if (-not $gitPath) {
        Write-Host ""
        Write-Host "❌ Git konnte nicht automatisch installiert werden." -ForegroundColor Red
        Write-Host ""
        Write-Host "   Bitte manuell installieren:" -ForegroundColor Yellow
        Write-Host "   1. Gehe zu: https://git-scm.com/download/win" -ForegroundColor White
        Write-Host "   2. Lade Git herunter und installiere es" -ForegroundColor White
        Write-Host "   3. Führe dieses Script danach erneut aus" -ForegroundColor White
        Write-Host ""
        Read-Host "Enter drücken zum Beenden"
        exit 1
    }
    Write-Host "  ✅ Git erfolgreich installiert!" -ForegroundColor Green
} else {
    Write-Host "  ✅ Git gefunden: $($gitPath.Source)" -ForegroundColor Green
}

# ── Schritt 2: .gitignore sicherstellen ──────────────────
$gitignore = Join-Path $DIR ".gitignore"
if (-not (Test-Path $gitignore)) {
    @"
node_modules/
dist/
.env
.env.local
.DS_Store
"@ | Set-Content $gitignore
    Write-Host "  ✅ .gitignore erstellt" -ForegroundColor Green
}

# ── Schritt 3: Git repo initialisieren & pushen ──────────
Set-Location $DIR

Write-Host ""
Write-Host "▶ Git initialisieren..." -ForegroundColor Cyan
git init
git config user.email "polysiusj@gmail.com"
git config user.name "Jannis Polysius"

Write-Host "▶ Branch auf 'main' setzen..." -ForegroundColor Cyan
git checkout -b main 2>$null
if ($LASTEXITCODE -ne 0) { git branch -M main }

Write-Host "▶ Remote setzen..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $REPO

Write-Host "▶ Dateien stagen und committen..." -ForegroundColor Cyan
git add .
git commit -m "Deploy: Phase 1 Polish — Notizfeld, Light-Mode, Login-Theme, Quiz-Fix"

Write-Host "▶ Push zu GitHub..." -ForegroundColor Cyan
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Erfolgreich gepusht!" -ForegroundColor Green
    Write-Host "   Vercel deployt jetzt automatisch (ca. 1-2 Minuten)." -ForegroundColor Green
    Write-Host "   URL: https://taktik-lernapp.vercel.app" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen." -ForegroundColor Red
    Write-Host "   Mach einen Screenshot und melde dich." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Enter drücken zum Beenden"
