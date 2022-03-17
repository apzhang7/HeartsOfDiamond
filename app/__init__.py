# Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
# SoftDev
# P02: Wordle Mania!™
# 2022-03-03
# Time Spent: ??

from flask import Flask, render_template, request, redirect
import sqlite3
import random
import html

app = Flask(__name__)

MAIN_DB = "leaderboard.db"

db = sqlite3.connect(MAIN_DB)
c = db.cursor()

c.execute("""
    CREATE TABLE IF NOT EXISTS LEADERBOARD (
        USER    TEXT,
        SCORE   INTEGER
    );""")
db.commit()
db.close()

@app.route("/")
def normalWordle():
    #userInput = request.form['user']
    return render_template("normal.html", wordle = randomWord(), defaultTime = 180, words = wordBank(), addTime = 60, mode = "/")

@app.route("/hard-wordle")
def hardWordle():
    return render_template("hard.html", wordle = randomWord(), defaultTime = 90, words = wordBank(), addTime = 30, mode = "/hard-wordle")

@app.route("/rude")
def rude():
    return render_template("rude.html", wordle = randomWord(), defaultTime = 180, words = wordBank(), addTime = 60, mode = "/rude")

@app.route("/zen")
def zen():
    return render_template("zen.html", wordle = randomWord(), defaultTime = 2**53-1, words = wordBank(), addTime = 0, mode = "/zen")

@app.route("/leaderboard", methods = ['GET', 'POST'])
def leaderboard():
    if request.method == "POST":
        if 'user' in request.form:
            db = sqlite3.connect(MAIN_DB)
            c = db.cursor()
            c.execute("""
                INSERT INTO LEADERBOARD (USER, SCORE) VALUES (?,?)
                """, ((request.form['user']), request.form['score']))
            db.commit()
            db.close()
            return redirect("/leaderboard")
    db = sqlite3.connect(MAIN_DB)
    c = db.cursor()
    c.execute("""
        SELECT * FROM LEADERBOARD ORDER BY SCORE DESC
        """,)
    data = c.fetchall()
    db.close()
    return render_template("leaderboard.html", userScore = data)

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
