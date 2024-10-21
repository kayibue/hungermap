import { BrowserRouter as Router } from "react-router-dom";
import Routes from "@routes";
import AOS from "aos";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <div>
      <Toaster />
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
