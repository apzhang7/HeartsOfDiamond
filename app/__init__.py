# Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
# SoftDev
# P02: Wordle Mania!™
# 2022-03-03
# Time Spent: ??

from flask import Flask
from flask import render_template
import random

app = Flask(__name__)

@app.route("/")
def normalWordle():
    return render_template("normal.html",wordle = randomWord())

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
        randomWord = words[random.randint(0,12833)][:-1]
        return randomWord


# Words should be updated here
wordleWord = "woops"
entered_word= "heheh"

# Lists to hold letters to compare 
letters1 = []
letters2 = []
results = []

# Iterate over the string to separate it into letters
for i in wordleWord:
    letters1.append(i)

# Printing letters for reference
for element in letters1:
    print(element, end=' ')
print('\n')

# Iterate over the string to separate it into letters
for i in entered_word:
    letters2.append(i)

# Printing letters for reference
for element in letters2:
    print(element, end=' ')
print('\n')

# Iterates over both lists to see if the letters match up
for i in range(0, 5):
        if (letters1[i] != letters2[i]):
            results.append('no')
        else:
            results.append('same')

# Printing results for reference
for element in results:
    print(element, end=' ')
print('\n')



if __name__ == "__main__":
    app.debug = True
    app.run()
