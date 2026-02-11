from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
import json

app = Flask(__name__)
CORS(app)

# Paths relative to the root project directory
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA_DIR = os.path.join(BASE_DIR, 'data')

def load_oil_data():
    file_path = os.path.join(DATA_DIR, 'BrentOilPrices.csv')
    df = pd.read_csv(file_path)
    # Basic cleaning
    df['Date'] = pd.to_datetime(df['Date'], format='mixed', dayfirst=True)
    df = df.sort_values('Date')
    return df

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        df = load_oil_data()
        # Convert to list of dicts for JSON
        data = df.tail(1000).to_dict(orient='records') # Limit for performance if needed
        
        # Load analysis results
        results_path = os.path.join(DATA_DIR, 'analysis_results.json')
        analysis_results = {}
        if os.path.exists(results_path):
            with open(results_path, 'r') as f:
                analysis_results = json.load(f)
        
        return jsonify({
            "prices": data,
            "analysis": analysis_results
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        events_path = os.path.join(DATA_DIR, 'events_data.csv')
        df = pd.read_csv(events_path)
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
