import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard");
        setMessage(res.data.message);
      } catch (err) {
        console.error("Admin data fetch error:", err);
        setMessage("Access denied or error!");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <span className="ml-2">Loading admin data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="text-xl" style={{ color: 'var(--primary)' }}>Admin Panel</h1>
          <p className="text-light">Administrative dashboard for system management</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Admin Access</h3>
            <p className="text-light mb-4">{message}</p>
            <div className="text-sm">
              <p><strong> Admin User:</strong> {user?.roles?.join(', ')}</p>
              <p><strong> Access Level:</strong> Full Administrative</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>User Management</h3>
            <p className="text-light mb-4">Manage user accounts, roles, and permissions.</p>
            <div className="text-sm">
              <p>Total Users: 2</p>
              <p>Active Users: 2</p>
              <p>Admin Users: 1</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>System Stats</h3>
            <p className="text-light mb-4">Monitor system performance and usage.</p>
            <div className="text-sm">
              <p>Server Status: Online</p>
              <p>Database: Connected</p>
              <p>Uptime: 99.9%</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <p className="text-light mb-4">Common administrative tasks.</p>
            <div className="nav">
              <Link to="/dashboard" className="btn btn-secondary">
                Back to Dashboard
              </Link>
              <button className="btn btn-danger" onClick={logout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
