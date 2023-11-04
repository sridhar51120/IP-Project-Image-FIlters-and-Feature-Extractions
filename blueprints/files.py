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
    if os.path.exists(folder_path) and os.path.isdir(folder_path):
        for filename in os.listdir(folder_path):
            folder_path = os.path.join(folder_path, filename)
            try:
                if os.path.isfile(folder_path):
                    os.unlink(folder_path)
                elif os.path.isdir(folder_path):
                    shutil.rmtree(folder_path)
            except Exception as e:
                pass
                # print(f"Failed to delete {folder_path}. Reason: {e}")
        return True


def createFolder(folder_path):
    os.makedirs(folder_path, exist_ok=True)
    return jsonify({'message': 'Success', 'folder_path': folder_path})


@bp.route('/isAvailablle_folder', methods=['GET'])
def isAvailbeFolder():
    received_json = request.args.get('data')
    data = json.loads(received_json) if received_json else None
    folderName = data['folderName']

    if os.path.exists(folderName):
        # Folder exists, try to delete its contents
        if remove_folder_contents(folderName):
            return jsonify({'message': 'Success', 'data': 'deleted'})
        else:
            return jsonify({'message': 'Error', 'reason': 'Failed to delete folder contents'})
    else:
        if createFolder(folderName):
            return jsonify({'message': 'Success', 'folder': 'created'})
        else:
            return jsonify({'message': 'Error', 'reason': 'Failed to create folder'})