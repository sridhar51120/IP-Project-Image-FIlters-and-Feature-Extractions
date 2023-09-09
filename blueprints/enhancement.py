from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Enhancement import Enhancement
import os

bp = Blueprint("enhancement", __name__, url_prefix="/enhancement")


@bp.route("/Histogram_Equalization",methods=['GET'])
def Histogram_Equalization_temp():
   return render_template("Histogram_Equalization.html")

@bp.route("/Histogram_Equalization_output",methods=['GET', 'POST'])
def Histogram_Equalization_output():
      if request.method == 'POST':
         if 'histogram-input-image-file' in request.files:
            file = request.files['histogram-input-image-file']
            img_path = f'assets/uploads/enhancement/histogram/{file.filename}'
            file.save(os.path.join(img_path)) 
            enhancement = Enhancement(img_path)
            hist_img = enhancement.histogram()
            data = {
                  'img_url': img_path,
                  'histo_img' : hist_img
               }
            return {
               'template' : render_template('enhancement/histogram.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'histo_img' : hist_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'
         

@bp.route("/Gamma_correction",methods=['GET'])
def Gamma_correction_temp():
   return render_template("Gamma_correction.html")


@bp.route("/Contrast_Stretching",methods=['GET'])
def Contrast_Stretching_temp():
   return render_template("Contrast_Stretching.html")
         