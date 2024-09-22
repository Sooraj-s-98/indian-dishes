import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import "@/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div></div>
      hello
      <h1>Vite + React</h1>
      <Button>Click Me</Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
