from flask import Blueprint, render_template, redirect, url_for, request, session

bp = Blueprint("/videoModals", __name__,
               url_prefix="/user_tutorial_video")


@bp.route("/weiner_user_tutorial_video", methods=['GET'])
def weiner_video_modal():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/weiner.html", data=data)


@bp.route("/cluster", methods=['GET'])
def Clustering_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/cluster.html", data=data)


@bp.route("/edge_detection", methods=['GET'])
def edge_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/edge_detection.html", data=data)


@bp.route("/region_detection", methods=['GET'])
def region_growing_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/region_growing.html", data=data)


@bp.route("/thresolding", methods=['GET'])
def thresolding_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/thresolding.html", data=data)


@bp.route("/deblur", methods=['GET'])
def deblur_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/deblur.html", data=data)


@bp.route("/inpaint", methods=['GET'])
def inpaint_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/in_paint.html", data=data)


@bp.route("/noise_reduction", methods=['GET'])
def noise_reduction_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/noise_reduction.html", data=data)


@bp.route("/histogram", methods=['GET'])
def histogram_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/histo.html", data=data)


@bp.route("/gamma_correction", methods=['GET'])
def gamma_correction_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/gamma_correction.html", data=data)


@bp.route("/contrast_strching", methods=['GET'])
def contrast_strching_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/contrast_strching.html", data=data)


@bp.route("/spatial", methods=['GET'])
def spatial_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/spatial_contrast.html", data=data)


@bp.route("/constraint_least_square", methods=['GET'])
def constraint_least_square_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Constrained_least_square_filtering.html", data=data)


@bp.route("/order_statics", methods=['GET'])
def order_statics_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/order_statics.html", data=data)


@bp.route("/harmonic", methods=['GET'])
def harmonic_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/harmonic_filter.html", data=data)


@bp.route("/geometric", methods=['GET'])
def geometric_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/geometric_mean.html", data=data)


@bp.route("/Gaussian_Noise", methods=['GET'])
def Gaussian_Noise_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Gaussian_Noise.html", data=data)


@bp.route("/median_filter", methods=['GET'])
def median_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Median_Filter.html", data=data)


@bp.route("/salt_and_papper_noise", methods=['GET'])
def salt_and_papper_noise_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Salt_and_papper_noise.html", data=data)


@bp.route("/adaptive_filter", methods=['GET'])
def adaptive_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/adaptive_filter.html", data=data)


@bp.route("/average_filter", methods=['GET'])
def average_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Average_filter.html", data=data)


@bp.route("/butterworth_filter", methods=['GET'])
def butterworth_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/butterworth_filter.html", data=data)


@bp.route("/high_pass_filter", methods=['GET'])
def high_pass_filter_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/high_pass_filter.html", data=data)


@bp.route("/homomarphic_filter", methods=['GET'])
def homomarphic_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Homomorphic.html", data=data)


@bp.route("/laplacian_filter", methods=['GET'])
def laplacian_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/laplacian_filter.html", data=data)


@bp.route("/low_pass_filter", methods=['GET'])
def low_pass_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/low_pass_filters.html", data=data)


@bp.route("/non_local_mean_filter", methods=['GET'])
def non_local_mean_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/non_local_means_filter.html", data=data)


@bp.route("/notch_filter", methods=['GET'])
def notch_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/notch_filter.html", data=data)


@bp.route("/unsharp_masking", methods=['GET'])
def unsharp_masking_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/unsharp_masking.html", data=data)


@bp.route("/weiner_filter", methods=['GET'])
def weiner_filter_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Weiner.html", data=data)


@bp.route("/dft", methods=['GET'])
def dft_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/dft.html", data=data)


@bp.route("/dilation", methods=['GET'])
def dilation_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/dilation.html", data=data)


@bp.route("/errosion", methods=['GET'])
def errosion_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/erosion.html", data=data)


@bp.route("/hierarchical-image", methods=['GET'])
def hierarchical_image_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/Hierarchical_Image.html", data=data)


@bp.route("/hough_transform", methods=['GET'])
def hough_transform_image_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/hough_transform.html", data=data)


@bp.route("/region_growing", methods=['GET'])
def region_growing_image_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/region_growing.html", data=data)


@bp.route("/region_merging", methods=['GET'])
def region_merging_image_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/region_merging.html", data=data)


@bp.route("/runLengthCoding", methods=['GET'])
def runLengthCoding_image_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/runLengthEncode.html", data=data)


@bp.route("/vectorQuantization", methods=['GET'])
def vectorQuantization_image_temp():
    data = {
        'title': 'Weiner Filter Video(Tutorial)'
    }
    return render_template("videoModal/VectorQuantization.html", data=data)
