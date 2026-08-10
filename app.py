import json
from pathlib import Path
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
DATA_PATH = Path(__file__).parent / "database" / "data.json"


@app.route('/')
def index():
    return render_template('home.html')

@app.route('/save', methods = ["POST"])
def save_thought():
    data = request.get_json()
    with open(DATA_PATH, 'r') as file:
        thoughts = json.load(file)

    thoughts.append(data)

    with open(DATA_PATH, "w") as file:
        json.dump(thoughts, file, indent=4)
    return "data added"

@app.route('/thoughts', methods = ["GET"])
def get_thoughts():
    with open(DATA_PATH, "r") as file:
        thoughts = json.load(file)
    return thoughts

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
