import os
def getContentFolder(folder_path):
    if os.path.exists(folder_path) and os.path.isdir(folder_path):
        folder_contents = os.listdir(folder_path)
        return folder_contents
    else:
        return "Folder doesn't exist or is not a directory"
    
print(getContentFolder('assets/uploads/filters/weiner_filter'))