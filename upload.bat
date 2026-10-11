@echo off
setlocal
cd /d "%~dp0"

echo [1/3] Adding files...
git add -A

set /p msg="Enter commit message (Press Enter for 'Auto update'): "
if "%msg%"=="" set msg=Auto update: %DATE% %TIME%

echo [2/3] Committing changes...
git commit -m "%msg%"

echo [3/3] Pushing to GitHub...
git push origin main

echo Done!
pause
