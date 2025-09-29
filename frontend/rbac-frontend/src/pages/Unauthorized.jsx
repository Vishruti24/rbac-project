import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <div className="text-center mb-6">
           
            <h1 className="text-xl" style={{ color: 'var(--error)' }}>Unauthorized Access</h1>
            <p className="text-light">You don't have permission to access this page.</p>
          </div>

          <div className="text-center">
            <p className="mb-6">
              This page requires specific permissions that your account doesn't have.
              Please contact an administrator if you believe this is an error.
            </p>

            <div className="nav">
              <Link to="/login" className="btn btn-primary">
                --Go to Login
              </Link>
              <Link to="/dashboard" className="btn btn-secondary">
                Back to Dashboard--
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
   
  );
}
