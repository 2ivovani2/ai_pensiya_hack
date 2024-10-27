from flask import Flask, render_template, request, redirect, url_for
import logging
import pandas as pd
from ml.ml_pipeline import CatPipeline
import random

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)
app = Flask(
    __name__,
    static_folder='staticfiles',
    static_url_path='/staticfiles'
)
random.seed(20)
# pipeline =  CatPipeline()

@app.route('/', methods=["GET", "POST"])
def home():
    global pipeline
    if request.method == "POST":
        if 'file' in request.files:
            
            file = request.files['file']
            allowed_extensions = {'csv', 'xlsx'}
            file_ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else ''
            
            if file_ext not in allowed_extensions:
                return redirect(url_for('error'))
            try:
                if file_ext == 'csv':
                    df = pd.read_csv(file, encoding="cp1251", sep=";")

                    logging.info(f"{df.shape}")

                elif file_ext == 'xlsx':
                    df = pd.read_excel(file)
                
                # preds, probas  = pipeline(df=df, flag_file=1)
                logging.info(preds, probas)

                logging.info("Файл успешно обработан")
                return redirect(url_for('error'))
            
            except Exception as e:
                logging.error(f"Возникла ошибка при обработке файла: {e}")
                return redirect(url_for('error'))

        else:
            data = dict(request.form)
            updated_data = {"slctn_nmbr": 0}
            updated_data.update(data)
            # preds, probas = pipeline(df=list(updated_data.values()))
            preds, probas = random.randint(0,1), round(random.random(), 2)
            return redirect(url_for('thank_you', pred=preds, proba=probas))
    
    return render_template('index.html')

@app.route('/error', methods=["GET"])
def error():
    return render_template('error.html')


@app.route('/thank-you', methods=["GET"])
def thank_you():
    pred = request.args.get('pred')
    proba = request.args.get('proba')
    return render_template('thank_you.html', pred=pred, proba=proba)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
