## INSTALLATION INSTRUCTIONS
Note that this program was written for Python 3.11, and these instructions assume a bash terminal
First, create and enter a virtual environment:
```bash
python -m venv .venv --prompt "Parks API"
source .venv/Scripts/activate
```

Next, install required packages:
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## RUNNING API
To run, first enter virtual environment, then use command:
```bash
uvicorn src.main:app --reload
```