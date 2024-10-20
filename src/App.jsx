import { BrowserRouter as Router } from "react-router-dom";
import Routes from "@routes";
import AOS from "aos";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
