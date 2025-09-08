import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="landing">
      <h1>Welcome to Student Performance Assistant</h1>
      <button onClick={() => navigate("/login")}>Get Started</button>
    </div>
  );
}

export default LandingPage;
