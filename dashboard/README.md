# Brent Oil Analysis Dashboard

This interactive dashboard visualizes Brent oil price trends, detected structural change points using Bayesian models, and correlates them with key historical events.

## Structure

- `backend/`: Flask API serving the price data and analysis results.
- `frontend/`: React (Vite) application with interactive charts.

## Setup Instructions

### Backend

1. Navigate to `dashboard/backend`.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`.

### Frontend

1. Navigate to `dashboard/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`.

## Features

- **Interactive Price Chart**: Explore historical Brent oil prices and see where the Bayesian model detected major structural shifts.
- **Event Correlation**: View a list of geopolitical and economic events that occurred around the detected change points.
- **Key Indicators**: Live summary of the latest price and analysis metadata.
