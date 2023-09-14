
from flask import Flask, redirect, url_for, request, render_template, session,Blueprint, Response, jsonify
import cv2
import numpy as np
import os
from src.Enhancement import Enhancement
from blueprints import enhancement, segmentation, restoring

app = Flask(__name__,static_folder='assets',static_url_path='/')

app.register_blueprint(enhancement.bp)
app.register_blueprint(segmentation.bp)
app.register_blueprint(restoring.bp)


@app.route("/",methods=['GET'])
def dashboard():
   return render_template("dashboard.html")

@app.route("/home",methods=['GET'])
def home():
   return {
      'Status' : True,
      "message" : "Success"
   },200

@app.route("/get",methods=['GET'])
def get():
   return jsonify({
      'Status': True,
      "messgae": "Success"
   })


if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)
