
from flask import Flask, redirect, url_for, request, render_template, session,Blueprint, Response

app = Flask(__name__,static_folder='assets',static_url_path='/')

@app.route("/",methods=['GET'])
def dashboard():
   return render_template("dashboard.html")

@app.route("/Histogram_Equalization",methods=['GET'])
def filter():
   return render_template("Histogram_Equalization.html")



if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)
