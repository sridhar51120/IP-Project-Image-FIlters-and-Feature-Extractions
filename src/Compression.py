import cv2
import numpy as np
import cv2
from scipy.signal import wiener
from scipy.optimize import minimize
import matplotlib.pyplot as plt
from skimage import io, color
from skimage.morphology import medial_axis, skeletonize
from skimage.util import invert
from scipy.fftpack import fft2, ifft2, fftshift, ifftshift

class Compression:
    def __init__(self, name):
        self.name = name