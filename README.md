# Brent Oil Prices Change Point Analysis

## Project Overview

This project analyzes historical Brent oil prices (1987-2022) to identify significant structural breaks using **Bayesian Change Point Detection**. The goal is to correlate these statistical changes with major geopolitical and economic events, providing actionable insights for investors and policymakers.

## Repository Structure

```
├── data/                   # Data files (BrentOilPrices.csv, events_data.csv, analysis_results.json)
├── dashboard/              # Interactive Dashboard (Flask + React)
│   ├── backend/            # Flask API
│   └── frontend/           # React App
├── scripts/                # Helper scripts (results generation)
├── notebooks/              # Jupyter notebooks for analysis
│   ├── 01_time_series_properties.ipynb
│   └── 02_change_point_model.ipynb
├── src/                    # Source code modules
│   ├── data_loader.py      # Data ingestion and cleaning
│   └── analysis.py         # Statistical tests and visualization
├── .gitignore              # Git ignore file
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

## Setup Instructions

1.  **Clone the repository**:

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install Dependencies**:
    It is recommended to use a virtual environment.

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

    _Note: For PyMC on Windows, using Conda is often easier: `conda install -c conda-forge pymc arviz`_

3.  **Data**:
    Ensure `BrentOilPrices.csv` is placed in the `data/` directory.

## Running the Analysis

The analysis is divided into two main notebooks:

1.  **`01_time_series_properties.ipynb`**: Exploratory Data Analysis, Trend, Stationarity (ADF), and Volatility analysis.
2.  **`02_change_point_model.ipynb`**: Implementation of the Bayesian Change Point model using PyMC to detect and quantify structural breaks.

Run the notebooks using Jupyter:

```bash
jupyter lab
```

## Interactive Dashboard

The project includes a premium interactive dashboard to visualize the analysis results.

### New Features (Updated)

- **Date Range Filters**: Explicitly select start and end dates to focus your analysis on specific time periods.
- **Event-Change Correlation**: Geopolitical events are now marked directly on the price chart. Events occurring within 30 days of the detected structural change point are highlighted in amber.
- **Proximity Tracking**: The event table now includes a "Proximity" column, showing exactly how many days separate an event from the detected change point.
- **Responsive Design**: The dashboard is built with a mobile-first approach using CSS Grid and Flexbox, ensuring it looks great on desktops, tablets, and phones.

### 1. Generate Results

Before running the dashboard, ensure the analysis results are generated:

```bash
python scripts/generate_analysis_results.py
```

### 2. Run Dashboard

Detailed instructions are available in [dashboard/README.md](dashboard/README.md).

**Quick Start:**

- **Backend**: `cd dashboard/backend && python app.py`
- **Frontend**: `cd dashboard/frontend && npm run dev`
