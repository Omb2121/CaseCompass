# CaseCompass Auto-Sync and Auto-Push Script (Runs every 10 minutes)
$repoPath = "c:\Users\Admin\Desktop\CaseCompass\Backed-caseCompass"
$frontendSrc = "c:\Users\Admin\Desktop\CaseCompass\frontend"
$frontendDest = "$repoPath\frontend"

function Sync-And-Push {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] Checking for workspace changes..."
    
    # 1. Sync latest frontend files into git repository (skipping node_modules and .git)
    if (Test-Path $frontendSrc) {
        robocopy $frontendSrc $frontendDest /E /XD node_modules .git /NJH /NJS /NDL /NC /NS | Out-Null
    }
    
    # 2. Check git status
    $status = git -C $repoPath status --porcelain
    if ($status) {
        Write-Host "[$timestamp] Detected modifications. Staging and committing..."
        git -C $repoPath add .
        git -C $repoPath commit -m "auto: periodic sync $timestamp"
        git -C $repoPath pull --rebase origin main
        git -C $repoPath push origin main
        Write-Host "[$timestamp] Successfully pushed changes to GitHub origin/main."
    } else {
        Write-Host "[$timestamp] Repository is up to date. No new changes."
    }
}

# Immediate initial sync check
Sync-And-Push

# Loop indefinitely every 10 minutes (600 seconds)
while ($true) {
    Start-Sleep -Seconds 600
    Sync-And-Push
}
