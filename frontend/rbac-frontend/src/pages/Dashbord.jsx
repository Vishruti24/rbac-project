import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <div className="dashboard">
        <div className="dashboard-header">
          <span className="icon-emoji"></span>
          <h1 className="text-xl" style={{ color: 'var(--primary)' }}>Dashboard</h1>
          <p className="text-light">Welcome back, {user?.roles?.includes('admin') ? 'Admin' : 'User'}!</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            
            <h3>User Profile</h3>
            <p className="text-light mb-4">Manage your account settings and preferences.</p>
            <div className="text-sm">
              <p><strong> Role:</strong> {user?.roles?.join(', ')}</p>
              <p><strong> Status:</strong> Active</p>
            </div>
          </div>

          <div className="dashboard-card">
           
            <h3>Analytics</h3>
            <p className="text-light mb-4">View your activity and performance metrics.</p>
            <div className="text-sm">
              <p>Login sessions: 12</p>
              <p>Last login: Today</p>
              <p>Account created: Recently</p>
            </div>
          </div>

          {user?.roles?.includes("admin") && (
            <div className="dashboard-card">
              
              <h3>Admin Tools</h3>
              <p className="text-light mb-4">Access administrative functions and user management.</p>
              <Link to="/admin" className="btn btn-secondary">
                Go to Admin Panel
              </Link>
            </div>
          )}

          <div className="dashboard-card">
           
            <h3>Quick Actions</h3>
            <p className="text-light mb-4">Common tasks and shortcuts.</p>
            <div className="nav">
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
