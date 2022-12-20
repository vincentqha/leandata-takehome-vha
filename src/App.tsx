import React, { useState } from "react";
import "./App.css";
import { User } from "./models";

function App() {
  const [users, setUsers] = useState<Array<User>>([]);

  return (
    <div className="App">
      <h1>LeanData Take Home Project</h1>
    </div>
  );
}

export default App;
