# Brent Oil Prices: Bayesian Change Point Analysis

This repository provides a comprehensive analysis of Brent oil price volatility (1987-2022) using **Bayesian Change Point Detection**. It correlates statistical structural breaks with major geopolitical and economic events through an interactive dashboard.

## Methodology & Rationale

### 1. Bayesian Change Point Model

We employ a **Poisson-like switch function** implemented in **PyMC** to identify when the underlying statistical properties of oil price returns change.

- **Choice of Model**: Unlike simple moving averages, a Bayesian model allows us to quantify uncertainty (posterior distribution) for the exact day a structural break occurred.
- **Log-Returns**: We analyze `log(Price_t / Price_{t-1})` instead of raw prices to handle non-stationarity and focus on relative volatility shifts.
- **Switch Function Logic**:
  ```python
  mu = pm.math.switch(tau >= idx, mu_post, mu_pre)
  ```
  Where `tau` is the discrete latent variable representing the change point index, and `mu_pre`/`mu_post` are the mean returns before and after the shift.
- **Sampling**: We use **Markov Chain Monte Carlo (MCMC)** with 500 tuning steps and 500 samples to derive the posterior distribution of the change point.

### 2. Event Correlation Structure

The event dataset (`data/events_data.csv`) was structured to include:

- **Political Decisions**: OPEC+ production cuts, sanctions (Iran, Russia).
- **Conflicts**: Gulf War, Iraq War, Arab Spring.
- **Economic Shocks**: 2008 Financial Crisis, 2020 COVID-19 demand collapse.

**Selection Criteria**: Events were included if they had a documented global impact on oil supply or demand and occurred within proximity to high-volatility periods identified in the EDA.

---

## Repository Structure

```
├── data/                   # BrentOilPrices.csv, events_data.csv, analysis_results.json
├── dashboard/              # Interactive Dashboard component
│   ├── backend/            # Flask API (serving pre-computed MCMC results)
│   └── frontend/           # React App (Vite + Recharts)
├── scripts/                # Utility: generate_analysis_results.py (runs MCMC)
├── notebooks/              # Research & EDA
│   ├── 01_time_series_properties.ipynb (Stationarity & Volatility)
│   └── 02_change_point_model.ipynb (Bayesian Implementation)
├── src/                    # Shared modules (data_loader.py)
├── requirements.txt        # Backend dependencies
└── README.md               # Main documentation
```

---

## Setup & Execution Guide

### Phase 1: Environment Setup

1. **Clone & Venv**:
   ```bash
   git clone <repo_url> && cd <repo_dir>
   python -m venv venv && source venv/bin/activate # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Phase 2: Running Analysis

1. **Explore Notebooks**: Open `notebooks/01_time_series_properties.ipynb` to see the statistical tests.
2. **Generate Database**: Run the Bayesian model to update `analysis_results.json`:
   ```bash
   python scripts/generate_analysis_results.py
   ```

### Phase 3: Launching Interactive Dashboard

**Backend (Flask)**:

```bash
cd dashboard/backend
pip install -r requirements.txt
python app.py
```

**Frontend (React)**:

```bash
cd dashboard/frontend
npm install
npm run dev
```

---

## Interactive Features

- **PriceChart**: Hover over markers to see event details. The red line indicates the median change point from the Bayesian posterior.
- **Filters**: Dynamically focus on specific geopolitical eras (e.g., 2008-2012 or 2019-2022).
- **Correlation Display**: The table automatically highlights events occurring within 30 days of the detected change point to provide instant causal context.
