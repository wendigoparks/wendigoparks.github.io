## Installation Instructions
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

This application also requires a MySQL database with the table which is created by the `parks.sql` file. It is required to add the database user's password in a `.env.local` file, as the `MYSQL_PASSWORD` variable, and any of the other variables in the `.env` file can be overwritten by the `.env.local` file, or by prefixing the run command with the desired environment variables, e.g.:
```bash
MYSQL_USERNAME=not_root MYSQL_PASSWORD=not_root_password uvicorn src.main:app --reload
```

## Running API
To run, first enter virtual environment, then use command:
```bash
uvicorn src.main:app --reload
```
This will run the application in a way so that whenever the application code is changed it will automatically restart. To access the API, there are Swagger UI docs at localhost:8000.