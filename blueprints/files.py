from flask import Blueprint, render_template, redirect, url_for, request, session, jsonify
import os
import cv2
import json
import shutil
import subprocess


bp = Blueprint("files", __name__, url_prefix="/files")


def getContentFolder(folder_path):
    if os.path.exists(folder_path) and os.path.isdir(folder_path):
        folder_contents = os.listdir(folder_path)
        return folder_contents
    else:
        return "Folder doesn't exist or is not a directory"


def remove_folder_contents(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(e)


def createFolder(folder_path):
    os.makedirs(folder_path, exist_ok=True)
    return jsonify({'message': 'Success', 'folder_path': folder_path})


@bp.route('/isAvailablle_folder', methods=['GET'])
def isAvailbeFolder():
    received_json = request.args.get('data')
    data = json.loads(received_json) if received_json else None
    folderName = data['folderName']

    if os.path.exists(folderName):
        remove_folder_contents(folderName)
        return jsonify({'message': 'Success', 'data': 'deleted'})
    else:
        if createFolder(folderName):
            return jsonify({'message': 'Success', 'folder': 'created'})
        else:
            return jsonify({'message': 'Error', 'reason': 'Failed to create folder'})
