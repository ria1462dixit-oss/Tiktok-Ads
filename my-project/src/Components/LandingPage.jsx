import { useState } from "react";
import "./LandingPage.css";

function LandingPage({ onConnectSuccess }) {
  const [isConnecting, setIsConnecting] = useState(false);

  function handleConnect() {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onConnectSuccess();
    }, 2000);
  }

  return (
    <div className="page">
      <header className="header">
        <span className="logo">TIKTOK ADS</span>
      </header>

      <div className="absolute-center">
        <div className="card">
          <div className="icon-wrapper">
            <span className="icon">🔗</span>
          </div>

          <h1 className="title">Connect Your Account</h1>

          <p className="subtitle">
            Link your TikTok Ads Manager account to start creating
            high-performing creative assets.
          </p>

          <button
            className="primary-btn"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <span className="spinner"></span>
                Connecting
              </>
            ) : (
              "Connect TikTok Account"
            )}
          </button>

          <p className="microcopy">
            Secure OAuth connection · No password shared
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
