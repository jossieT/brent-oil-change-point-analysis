# Brent Oil Analysis Dashboard: Documentation

This dashboard provides a premium interactive interface for stakeholders to explore the relationship between historical events and oil price structural shifts.

## Setup Instructions

### 1. Requirements

- **Python 3.10+** (Flask, Pandas, Flask-CORS)
- **Node.js 18+ & NPM** (React, Vite, Recharts, Lucide-React)

### 2. Detailed Steps

#### Backend

1. **Navigate**: `cd dashboard/backend`
2. **Install**: `pip install Flask flask-cors pandas` (or use `requirements.txt`)
3. **Run**: `python app.py`
   - _Note_: Ensure the backend is running on `http://localhost:5000`. The frontend relies on this specific port.

#### Frontend

1. **Navigate**: `cd dashboard/frontend`
2. **Install**: `npm install`
3. **Run**: `npm run dev`
   - _Note_: Open `http://localhost:5173` in your browser.

---

## Interaction Flows & Behaviors

### 1. Filtering Logic

- **Action**: Users enter a Start and End date in the sidebar/top filter card.
- **Behavior**: The `App.jsx` component performs a `useMemo` filter on both the `prices` and `events` arrays.
- **Result**: Charts and tables update instantly without reloading data from the server, providing a snappy "Single Page App" (SPA) experience.

### 2. Event-Change Correlation

- **Visual Evidence**:
  - The **Amber markers** on the price chart indicate specific historical events.
  - The **Red dashed line** represents the Bayesian Change Point.
- **Highlighting**: The `EventTable` automatically calculates distance (in days) between an event and the change point. If distance ≤ 30 days, the row glows with an amber background, signaling a likely causal relationship.

### 3. Responsive Design Strategy

- **Framework**: No external UI kits (like Tailwind) were used; all styles are custom Vanilla CSS in `index.css` for maximum performance.
- **Technique**: Uses **CSS Grid** for the main dashboard shell and **Media Queries** to stack components on viewports narrower than 1024px.
- **Mobile View**: All cards take 100% width on mobile, and the table enables horizontal scrolling to prevent data truncation.

---

## Example Interaction Scenarios

| User Action              | Predicted Outcome                | UI Visual Cue                           |
| :----------------------- | :------------------------------- | :-------------------------------------- |
| **Hover on Blue Line**   | Shows Price/Date tooltip         | Standard blue tooltip                   |
| **Hover on Amber Point** | Shows Geopolitical Event content | Primary Blue/Amber border tooltip       |
| **Filter to '2020-04'**  | Focuses on COVID crash           | Chart zooms into the extreme price drop |
| **View on iPhone**       | Components stack vertically      | Vertical scroll active                  |
