
from flask import Flask, redirect, url_for, request, render_template, session,Blueprint, Response, jsonify
import cv2
import numpy as np
import os
from src.Enhancement import Enhancement

app = Flask(__name__,static_folder='assets',static_url_path='/')

@app.route("/",methods=['GET'])
def dashboard():
   return render_template("dashboard.html")

@app.route("/Histogram_Equalization",methods=['GET'])
def Histogram_Equalization_temp():
   return render_template("Histogram_Equalization.html")

@app.route("/Histogram_Equalization_output",methods=['GET', 'POST'])
def Histogram_Equalization_output():
      if request.method == 'POST':
         if 'histogram-input-image-file' in request.files:
            file = request.files['histogram-input-image-file']
            file.save(os.path.join('uploads/enhancement/histogram', file.filename))
            img_path = f'uploads/enhancement/histogram/{file.filename}'
            enhancement = Enhancement(img_path)
            hist_img = enhancement.histogram()
            file_details = {
                  'img_url': img_path,
                  'histo_img' : hist_img
               }
            return render_template('enhancement/histogram.html',data = file_details)
         else:
            return 'No file part in the request'
         

@app.route("/upload",methods=['GET'])
def upload():
   original_filename = request.form['img_url']
   histogram_file_name = request.form['histo_img']
   return jsonify({
      'original_filename' : original_filename,
      'histogram_filename' : histogram_file_name
   })

if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)
