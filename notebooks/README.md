# Brent Oil Prices Change Point Analysis

This folder contains the Jupyter notebooks for the analysis of Brent oil prices.

## Notebooks

1.  **`01_time_series_properties.ipynb`**:

    - Loads the raw data (`data/BrentOilPrices.csv`).
    - Analyzes trends, stationarity (ADF test), and volatility.
    - Prepares the understanding for the change point model.

2.  **`02_change_point_model.ipynb`**:
    - Calculates log returns.
    - Implements a Bayesian Change Point Detection model using **PyMC**.
    - Identifies the date of significant structural breaks.
    - Maps the detected change point to historical events from `data/events_data.csv`.

## Setup

Ensure you have the necessary Python packages installed. You can install them via pip:

```bash
pip install -r ../requirements.txt
```

**Note on PyMC**:
Installing PyMC on Windows can sometimes require specific compiler tools. If you encounter issues with `pip install pymc`, it is highly recommended to use **Conda**:

```bash
conda install -c conda-forge pymc arviz
```

## Running

Start Jupyter Lab or Notebook from the terminal:

```bash
jupyter lab
```

Then open and run the notebooks in order.
