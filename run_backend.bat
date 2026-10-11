@echo off
set "PATH=%LOCALAPPDATA%\Programs\Python\Python313\Scripts;%LOCALAPPDATA%\Programs\Python\Python313;%PATH%"
py -m uvicorn backend.api.main:app --reload --port 8000
