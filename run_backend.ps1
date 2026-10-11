$env:Path = "$env:LOCALAPPDATA\Programs\Python\Python313\Scripts;$env:LOCALAPPDATA\Programs\Python\Python313;" + $env:Path
py -m uvicorn backend.api.main:app --reload --port 8000
