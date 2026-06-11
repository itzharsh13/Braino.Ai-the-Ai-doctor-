import pickle
import pandas as pd

try:
    model = pickle.load(open(r'C:\BrainoAi\trained model\model.pkl', 'rb'))
    print("Model loaded")
    print("Features:", model.feature_names_in_)
    print("Model type:", type(model))
except Exception as e:
    print("Error loading model:", e)

try:
    le = pickle.load(open(r'C:\BrainoAi\trained model\label_encoder.pkl', 'rb'))
    print("Label encoder loaded")
    print("LE type:", type(le))
except Exception as e:
    print("Error loading label encoder:", e)