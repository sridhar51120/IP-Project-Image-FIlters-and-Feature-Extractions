from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    items = [
        {'title': 'Item 1', 'description': 'Description for Item 1'},
        {'title': 'Item 2', 'description': 'Description for Item 2'},
        {'title': 'Item 3', 'description': 'Description for Item 3'}
    ]
    return render_template('index.html', items=items)

if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)