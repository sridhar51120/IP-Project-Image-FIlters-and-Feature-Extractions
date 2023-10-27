from flask import Blueprint, render_template

bp = Blueprint("modals", __name__, url_prefix="/modals")

@bp.route("/cluster",methods=['GET'])
def Clustering_temp():
   return render_template("modals/cluster.html")

@bp.route("/edge_detection",methods=['GET'])
def edge_temp():
   return render_template("modals/edge_detection.html")

@bp.route("/region_detection",methods=['GET'])
def region_growing_temp():
   return render_template("modals/region_growing.html")

@bp.route("/thresolding",methods=['GET'])
def thresolding_temp():
   return render_template("modals/thresolding.html")

@bp.route("/deblur",methods=['GET'])
def deblur_temp():
   return render_template("modals/deblur.html")


@bp.route("/inpaint",methods=['GET'])
def inpaint_temp():
   return render_template("modals/inpaint.html")


@bp.route("/noise_reduction",methods=['GET'])
def noise_reduction_temp():
   return render_template("modals/noise_reduction.html")

@bp.route("/histogram",methods=['GET'])
def histogram_temp():
   return render_template("modals/histo.html")

@bp.route("/gamma_correction",methods=['GET'])
def gamma_correction_temp():
   return render_template("modals/gamma_correction.html")

@bp.route("/contrast_strching",methods=['GET'])
def contrast_strching_temp():
   return render_template("modals/contrast_strching.html")

@bp.route("/spatial",methods=['GET'])
def spatial_temp():
   return render_template("modals/spatial_contrast.html")

@bp.route("/constraint_least_square",methods=['GET'])
def constraint_least_square_temp():
   return render_template("modals/Constrained_least_square_filtering.html")

@bp.route("/order_statics",methods=['GET'])
def order_statics_temp():
   return render_template("modals/order_statics.html")

@bp.route("/harmonic",methods=['GET'])
def harmonic_temp():
   return render_template("modals/harmonic_filter.html")

@bp.route("/geometric",methods=['GET'])
def geometric_temp():
   return render_template("modals/geometric_mean.html")