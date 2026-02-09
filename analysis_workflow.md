# Data Analysis Workflow - Brent Oil Prices Change Point Analysis

## 1. Data Ingestion and Cleaning

- **Source**: `BrentOilPrices.csv`
- **Steps**:
  1.  Load data using Pandas.
  2.  Convert `Date` column to datetime objects.
  3.  Check for missing values and handle them (interpolation or drop).
  4.  Verify data range (1987-2022).

## 2. Exploratory Data Analysis (EDA)

- **Visual Inspection**: Plot the raw Price series to identify obvious trends and outliers.
- **Stationarity Check**:
  - Augmented Dickey-Fuller (ADF) test.
  - If non-stationary, compute Log Returns (`np.log(Price_t / Price_{t-1})`).
- **Volatility Analysis**:
  - Rolling standard deviation.
  - Plot log returns to visualize volatility clustering.

## 3. Event Data Compilation

- **Objective**: Contextualize statistical findings with real-world events.
- **Source**: Public domain records of geopolitical and economic history.
- **Output**: `events_data.csv` (Date, Event Name, Description).

## 4. Change Point Modeling (PyMC)

- **Model Choice**: Bayesian Change Point Detection.
- **Approach**:
  - Model the price (or returns) as a sequence of segments with different parameters (mean, variance).
  - Use `pm.math.switch` to define change points.
  - Prior: Uniform distribution for change point location (`tau`).
  - Likelihood: Normal distribution for observed data.
- **Validation**:
  - Trace plots for convergence (`r_hat`).
  - Posterior predictive checks.

## 5. Insight Generation and Reporting

- **Mapping**: Correlate detected change points (`tau` posterior) with compiled events.
- **Quantification**: Calculate the magnitude of change (e.g., % increase in mean price).
- **Mapping**: Correlate detected change points (`tau` posterior) with compiled events.
- **Quantification**: Calculate the magnitude of change (e.g., % increase in mean price).
- **Communication**: Summarize findings in a clear, narrative-driven report (Notebook/Markdown).

## 6. Change Point Model Explanation & Expected Outputs

- **Purpose**: Financial time series often exhibit "regime changes" rather than gradual evolution. A Change Point Model identifies these discrete jumps (structural breaks).
- **Mechanism**: The model assumes data comes from different probability distributions before and after a time point $\tau$. MCMC sampling estimates the most likely location of $\tau$.
- **Expected Outputs**:
  - **Date of Change ($\tau$)**: A probability distribution over dates, typically peaking at the most likely day of the shift.
  - **Parameter Shifts**: Pre- and post-change mean ($\mu_1, \mu_2$) and volatility ($\sigma$).
  - **Uncertainty Estimates**: 95% High Density Intervals (HDI) for all parameters.

## 7. Communication Channels

- **Primary Channel**: Interactive Dashboard (Streamlit/Dash) or Static Report (PDF/HTML from Notebook).
- **Target Audience & Format**:
  - **Investors**: Executive summary with key buy/sell signals and risk metrics (Volatility changes).
  - **Policymakers**: Narrative report focusing on the impact of specific geopolitical events.
  - **Analysts**: Full technical notebook with code and statistical diagnostics.

## Assumptions and Limitations

- **Assumptions**:
  - The compiled event list captures the major drivers of price changes.
  - The chosen change point model (e.g., mean-shift) adequately represents the structural breaks.
- **Limitations**:
  - **Correlation vs. Causation**: Identifying a change point near an event does not prove the event caused the change.
  - **Omitted Variables**: Oil prices are influenced by a complex web of factors (supply, demand, speculation) not captured by a simple univariate model.
  - **Model Simplicity**: A single or few change points might oversimplify the continuous evolution of the market.
