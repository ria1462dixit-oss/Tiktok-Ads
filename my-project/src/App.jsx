import { useState } from "react";
import LandingPage from "./Components/LandingPage";
 import CampaignForm from "./Components/CampaignForm";

function App() {
  const [connected, setConnected] = useState(false);

  return connected ? (
    <CampaignForm onSessionExpired={() => setConnected(false)} />
  ) : (
    <LandingPage onConnectSuccess={() => setConnected(true)} />
  );
}

export default App;
