
from flask import Flask, redirect, url_for, request, render_template, session,Blueprint, Response, jsonify
import cv2
import numpy as np
import os
from src.Enhancement import Enhancement
from blueprints import enhancement, segmentation, restoring, modals, filters1, filters2, files

app = Flask(__name__,static_folder='assets',static_url_path='/')

app.config['FLASK_DEBUG'] = True

app.register_blueprint(enhancement.bp)
app.register_blueprint(segmentation.bp)
app.register_blueprint(restoring.bp)
app.register_blueprint(modals.bp)
app.register_blueprint(filters1.bp)
app.register_blueprint(filters2.bp)
app.register_blueprint(files.bp)

@app.route("/",methods=['GET'])
def dashboard():
   # return render_template('multiple_language_code_sniippets.html')
   return render_template('home.html')
   # return render_template("dashboard.html")

@app.route("/home",methods=['GET'])
def home():
   return render_template('home.html')

@app.route("/copy",methods=['GET'])
def copy():
   return render_template('copy.html')

@app.route("/test",methods=['GET'])
def test():
   return render_template('test.html')

# TODO:
'''
   Homomarphic filter -> Python Code
   Hormonic Filter -> js and Html Code

'''
if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)
