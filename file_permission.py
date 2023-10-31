file_path = 'assets/uploads/filters/homomarphic/input_image.jpg'

# Check and change directory permissions if necessary
try:
    with open(file_path, 'w') as file:
        file.write('Check Permissions')
        print("Permission granted")
except PermissionError:
    print("Permission denied")
    # You may need to run your script with elevated privileges or change directory permissions
