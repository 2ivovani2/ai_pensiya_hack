from flask import Flask, render_template, request, redirect, url_for
import logging

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)
app = Flask(
    __name__,
    static_folder='staticfiles',
    static_url_path='/staticfiles')

@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "POST":
        data = request.form
        name = data.get("name", "Анонимная шлюха")
        return redirect(url_for('thank_you', name=name))
    
    return render_template('index.html')

@app.route('/thank-you')
def thank_you():
    name = request.args.get('name')
    
    return render_template('thank_you.html', name=name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
