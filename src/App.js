import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock-analysis" element={<div>Stock Analysis</div>} />
          <Route path="/predictions" element={<div>AI Predictions</div>} />
          <Route path="/trends" element={<div>Market Trends</div>} />
          <Route path="/reports" element={<div>Reports</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
