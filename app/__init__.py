# Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
# SoftDev
# P02: Wordle Mania!™
# 2022-03-03
# Time Spent: ??

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def normalWordle():
    return render_template("normal.html")

@app.route("/hard-wordle")
def hardWordle():
    return render_template("hard.html")

@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
