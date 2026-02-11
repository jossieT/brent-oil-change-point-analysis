import sys
import os
import pandas as pd
import numpy as np
import pymc as pm
import json

# Add src to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.data_loader import load_data, calculate_log_returns

def generate_results():
    print("Loading data...")
    file_path = 'data/BrentOilPrices.csv'
    df = load_data(file_path)
    df = calculate_log_returns(df)
    
    # We use a subset or a faster run if needed, but for now let's try to get a solid result
    # For the dashboard, we might want price data too
    
    y = df['Log_Returns'].values
    n_samples = len(y)
    idx = np.arange(n_samples)

    print("Running Bayesian Change Point Detection (MCMC)... this might take a minute.")
    with pm.Model() as model:
        tau = pm.DiscreteUniform("tau", lower=0, upper=n_samples - 1)
        mu1 = pm.Normal("mu1", mu=0, sigma=0.1)
        mu2 = pm.Normal("mu2", mu=0, sigma=0.1)
        sigma = pm.HalfNormal("sigma", sigma=0.1)
        mu = pm.math.switch(tau >= idx, mu2, mu1)
        obs = pm.Normal("obs", mu=mu, sigma=sigma, observed=y)
        
        # Reduced samples for speed if it's too slow, but let's try 500/500
        trace = pm.sample(500, tune=500, cores=1, return_inferencedata=True, progressbar=False)

    tau_posterior = trace.posterior['tau'].values.flatten()
    tau_mean = int(np.mean(tau_posterior))
    change_date = df.index[tau_mean]
    
    # Calculate Quantitative Metrics
    mu1_mean = float(trace.posterior['mu1'].mean())
    mu2_mean = float(trace.posterior['mu2'].mean())
    sigma_mean = float(trace.posterior['sigma'].mean())
    
    # Calculate pre/post standard deviation independently for extra detail
    vol_pre = float(df['Log_Returns'].iloc[:tau_mean].std())
    vol_post = float(df['Log_Returns'].iloc[tau_mean:].std())
    
    print(f"Detected Change Point: {change_date.date()}")
    print(f"Mean Shift: {mu1_mean:.5f} -> {mu2_mean:.5f}")
    
    # Save Results
    results = {
        "change_point": {
            "index": int(tau_mean),
            "date": change_date.strftime('%Y-%m-%d'),
            "mu1": mu1_mean,
            "mu2": mu2_mean,
            "sigma": sigma_mean,
            "vol_pre": vol_pre,
            "vol_post": vol_post,
            "abs_mu_shift": abs(mu2_mean - mu1_mean),
            "pct_vol_change": ((vol_post - vol_pre) / vol_pre * 100) if vol_pre != 0 else 0
        }
    }
    
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    with open('data/analysis_results.json', 'w') as f:
        json.dump(results, f, indent=4)
    
    print("Results saved to data/analysis_results.json")

if __name__ == "__main__":
    generate_results()
