import pandas as pd
import numpy as np

def load_data(file_path: str) -> pd.DataFrame:
    """
    Load Brent Oil Prices data from CSV.
    
    Args:
        file_path (str): Path to the CSV file.
        
    Returns:
        pd.DataFrame: DataFrame with Date index and Price column.
    """
    try:
        df = pd.read_csv(file_path)
        df['Date'] = pd.to_datetime(df['Date'], format='mixed', dayfirst=True)
        df = df.sort_values('Date').set_index('Date')
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()

def calculate_log_returns(df: pd.DataFrame, price_col: str = 'Price') -> pd.DataFrame:
    """
    Calculate log returns for stationarity.
    
    Args:
        df (pd.DataFrame): Input DataFrame.
        price_col (str): Name of the price column.
        
    Returns:
        pd.DataFrame: DataFrame with new 'Log_Returns' column, NaN values dropped.
    """
    df = df.copy()
    df['Log_Returns'] = np.log(df[price_col] / df[price_col].shift(1))
    return df.dropna()
