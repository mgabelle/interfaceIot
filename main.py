from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def accueil():
    return render_template('home.html')

@app.route('/test/<id>')
def test(id):
    return "This is test " + id


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)    