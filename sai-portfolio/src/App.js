import React from "react";
import Assistant from "./components/Assistant/Assistant";
import { BackgroundBoxesDemo } from "./components/BackgroundBoxesDemo";

function App() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-black p-4">
      <div className="max-w-5xl mx-auto">
        <BackgroundBoxesDemo />
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center mt-8">
        <Assistant />
      </div>
    </div>
  );
}

export default App;
