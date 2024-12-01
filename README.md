# Dashboard Project

This is a web-based dashboard that displays various statistics, charts, and transaction data. It is designed to provide an overview of key business metrics like sales, expenses, net profit, and more.

## Screencast
https://github.com/user-attachments/assets/f375bf8a-015d-45b9-a276-d2afbf5222a4

## Thought Process
To create this project, I followed these steps:
* Set up all the technology needed and decide the libraries to use for data-fetching, charts and calendar
* Get an overview of the workings of Chakra UI
* Generate fake data and serve it using JSON server
* Create a context that fetches data, handles loading, error states and caching and exposes only the fetched data
* Create components for the UI and populate them using the data from the context
* Testing and clean-up of the code

### Key Features:
- **Filtering data by range**:The KPI cards allow you to filter the data by a range of dates
- **Interactive Charts**: Line charts for sales and expenses trends, bar charts for revenue by region, bubble charts to show customer activity by region and pie charts for expenses by category.
- **Transaction Filtering**: Ability to filter and search transactions based on type and date.
- **Responsive Design**: Ensured the dashboard is fully responsive and adapts to different screen sizes using Chakra UI for UI components and Recharts for the data visualizations.
- **Performance Optimization**: Used `useMemo` for memoization of expensive operations like filtering and sorting transactions to improve performance.
- **Dark mode**

## Challenges Faced

### 1. **Responsive Design and Layout Issues**
Ensuring that the dashboard was responsive across various screen sizes was challenging, particularly when it came to chart and table layouts. The charts would often overflow or not resize correctly on smaller screens.
- **Solution**: I used Chakra UI's responsive styles (such as `w="100%"` and `maxWidth="100%"`) and wrapped the charts inside `ResponsiveContainer` from Recharts. 

### 2. **Picking a custom range of dates for the KPI cards**
I had a tough time finding the right calendar library that would allow picking of a range of dates without type issues
- **Solution**: I found react-calendar and downloaded the types library and exposed the types for the range of dates


## Future Improvements

### 1. **Advanced Data Visualizations**
- Adding advanced drill-down charts that can show a bar chart of sales over time when a bubble on the bubbleChart is clicked.

### 2. **Data Export**
- Implementing a feature to export the filtered transaction data and chart visualizations as CSV or PDF files could make this dashboard more useful for business reporting.

### 3. **Real-time Data**
- Currently, the dashboard displays static data. Integrating real-time data updates (using WebSockets or polling) to provide live updates.

### 5. **Styling and Theming**
- Custom styling for the react-calendar to match the theme 

## Setup Instructions

### Prerequisites:
- Node.js (v18 or later)

### Installation:
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/dashboard-project.git
    ```

2. Install dependencies:
    ```bash
    cd dashboard-project
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```
or
    
4. Start the production server:
    ```bash
    npm run build && npm run start
    ```
5. Start the json server
    ```bash
     npx json-server --watch db.json --port 3001
    ```

### Running the Project:
- Once the server is running, open your browser and go to `http://localhost:3000` to view the dashboard.


