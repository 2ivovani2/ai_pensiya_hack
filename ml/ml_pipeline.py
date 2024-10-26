import catboost, logging
import numpy as np
import pandas as pd

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)

class CatPipeline:
    def __init__(self, path_model='ml/catboost_model_best.cbm'):
        '''
        Загружаем датасет и модель
        '''
        
        self.catfeatures = ['gndr','accnt_bgn_date','accnt_status','prvs_npf','brth_plc','addrss_type','rgn','dstrct','city','sttlmnt','pstl_code','phn','email','lk','assgn_npo','assgn_ops']
        self.cat_model = catboost.CatBoostClassifier(cat_features=self.catfeatures)
        self.cat_model.load_model(path_model)
 
    def load_file(self, df):
        
        if len(df.columns) != 24:
            raise Exception("Неверное кол-во колонок")
        
        for f  in ['cprtn_prd_d', 'clnt_id', 'accnt_id']:
            try:
                features = df.drop([f], axis=1)
            except:
                pass
        
        features[self.catfeatures] = features[self.catfeatures].fillna("missing")
        
        return features
             
    def make_predictions(self, features):
        preds = self.cat_model.predict(features)
        probas = self.cat_model.predict_proba(features)
        return preds, probas
        
    def __call__(self, flag_file=0, df=None):
        if flag_file == 1:
            features = self.load_file(df)
            preds, probas = self.make_predictions(features)
        else:
            preds, probas = self.make_predictions(df)
        
        return preds, probas