# Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
# SoftDev
# P02: Wordle Mania!™
# 2022-03-03
# Time Spent: ??

from flask import Flask 
from flask import render_template

app = Flask(__name__)  

@app.route("/")
def hello_world():
    return "No hablo queso!"
    
if __name__ == "__main__": 
    app.debug = True
    app.run()