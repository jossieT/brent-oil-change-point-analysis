import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import adfuller

def plot_time_series(df: pd.DataFrame, col: str, title: str, ylabel: str, color: str = 'blue'):
    """
    Plot a time series.
    """
    plt.figure(figsize=(15, 7))
    plt.plot(df.index, df[col], label=col, color=color)
    plt.title(title, fontsize=16)
    plt.ylabel(ylabel, fontsize=14)
    plt.xlabel('Date', fontsize=14)
    plt.legend()
    plt.show()

def check_stationarity(timeseries: pd.Series):
    """
    Perform Augmented Dickey-Fuller test.
    """
    print(f"Results of Dickey-Fuller Test for {timeseries.name}:")
    dftest = adfuller(timeseries, autolag='AIC')
    dfoutput = pd.Series(dftest[0:4], index=['Test Statistic', 'p-value', '#Lags Used', 'Number of Observations Used'])
    for key, value in dftest[4].items():
        dfoutput['Critical Value (%s)' % key] = value
    print(dfoutput)
    print("\n")

def plot_rolling_volatility(series: pd.Series, window: int = 30):
    """
    Plot rolling standard deviation.
    """
    rolling_std = series.rolling(window=window).std()
    plt.figure(figsize=(15, 7))
    plt.plot(series.index, rolling_std, label=f'{window}-Day Rolling Std Dev', color='red')
    plt.title(f'Volatility (Rolling {window}-Day Std Dev)', fontsize=16)
    plt.ylabel('Volatility', fontsize=14)
    plt.xlabel('Date', fontsize=14)
    plt.legend()
    plt.show()
