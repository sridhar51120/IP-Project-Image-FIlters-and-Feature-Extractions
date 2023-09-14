from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Restoration import Restoration
import os

bp = Blueprint("restoring", __name__, url_prefix="/restoring")

@bp.route("/deblur",methods=['GET'])
def deblur_temp():
   return render_template("deblur.html")

@bp.route("/deblur_output",methods=['POST'])
def deblur_output():
      if request.method == 'POST':
         if 'deblur-input-image-file' in request.files:
            file = request.files['deblur-input-image-file']
            img_path = f'assets/uploads/restoration/deblur/{file.filename}'
            file.save(os.path.join(img_path)) 
            restoration = Restoration(img_path)
            deblur_img = restoration.debluring()
            
            data = {
                  'img_url': img_path,
                  'deblur_img' : deblur_img
               }
            
            return {
               'template' : render_template('restoring/deblur.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'deblur_img' : deblur_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/in_paint",methods=['GET'])
def in_paint_temp():
   return render_template("in_paint.html")


@bp.route("/in_paint_output",methods=['POST'])
def in_paint_output():
      if request.method == 'POST':
         if 'deblur-input-image-file' in request.files:
            file = request.files['deblur-input-image-file']
            img_path = f'assets/uploads/restoration/deblur/{file.filename}'
            file.save(os.path.join(img_path)) 
            restoration = Restoration(img_path)
            deblur_img = restoration.debluring()
            
            data = {
                  'img_url': img_path,
                  'deblur_img' : deblur_img
               }
            
            return {
               'template' : render_template('restoring/deblur.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'deblur_img' : deblur_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/noise_reduction",methods=['GET'])
def noise_reduction_temp():
   return render_template("noise_reduction.html")

