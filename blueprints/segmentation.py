from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Segmentation import Segmentation
import os

bp = Blueprint("segmentation", __name__, url_prefix="/segmentation")

@bp.route("/Clustering",methods=['GET'])
def Clustering_temp():
   return render_template("Clustering.html")

@bp.route("/Clustering_output",methods=['POST'])
def Clustering_output():
      if request.method == 'POST':
         if 'cluster-input-image-file' in request.files:
            file = request.files['cluster-input-image-file']
            img_path = f'assets/uploads/segmantation/clustering/{file.filename}'
            file.save(os.path.join(img_path)) 
            segmantation = Segmentation(img_path)
            # TODO: Continue
         
@bp.route("/Edge_detection",methods=['GET'])
def Edge_detection_temp():
   return render_template("Edge_detection.html")

@bp.route("/Region_growing",methods=['GET'])
def Region_growing_temp():
   return render_template("Region_growing.html")


@bp.route("/Thresholding",methods=['GET'])
def Thresholding_temp():
   return render_template("Thresholding.html")
