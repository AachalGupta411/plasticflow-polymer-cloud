import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plants from "./pages/Plants";
import Analytics from "./pages/Analytics";
import Workflow from "./pages/Workflow";
import Monitoring from "./pages/Monitoring";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
