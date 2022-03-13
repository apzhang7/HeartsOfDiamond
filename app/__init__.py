# Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
# SoftDev
# P02: Wordle Mania!™
# 2022-03-03
# Time Spent: ??

from flask import Flask
from flask import render_template
import random
import html

app = Flask(__name__)

@app.route("/")
def normalWordle():
    return render_template("normal.html", wordle = randomWord(), defaultTime = 180, words = wordBank())

@app.route("/hard-wordle")
def hardWordle():
    return render_template("hard.html")

@app.route("/rude")
def rude():
    return render_template("rude.html")

@app.route("/zen")
def zen():
    return render_template("zen.html")

@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")

def randomWord():
    with open('static/words.txt') as file:
        words = file.readlines()
        randomWord = words[random.randint(0,2313)][:-1]
        return randomWord

def wordBank() :
    with open('static/words.txt') as file:
        words = file.readlines()
        wordBank = ""
        for word in words:
            wordBank += str(word.strip()) + " "
        return wordBank[0:len(wordBank)-1]

if __name__ == "__main__":
    app.debug = True
    app.run()
