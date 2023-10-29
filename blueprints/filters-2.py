from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Segmentation import Segmentation
import os
import cv2

bp = Blueprint("filters2", __name__, url_prefix="/filters2")


@bp.route("/weiner", methods=['GET'])
def weiner_temp():
    pass