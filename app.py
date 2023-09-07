
from flask import Flask, redirect, url_for, request, render_template, session,Blueprint, Response

app = Flask(__name__,static_folder='assets',static_url_path='/')

@app.route("/",methods=['GET','POST'])
def dashboard():
   return render_template("dashboard.html")

@app.route("/filter",methods=['GET','POST'])
def filter():
   return render_template("filter.html")


if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)
