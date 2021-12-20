import { useEffect } from "react";
import logo from "./d44.png";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("Só uma vez...");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Executar uma única vez</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Projetando soluções...
        </a>
      </header>
    </div>
  );
}

export default App;
