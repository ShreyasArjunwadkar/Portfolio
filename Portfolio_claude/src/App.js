import React from "react";
import Assistant from "./components/Assistant/Assistant";
import { Boxes } from "./components/ui/background-boxes";

function App() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
      {/* Background layer - fixed position */}
      <div className="fixed inset-0 w-full h-full bg-slate-900">
        {/* Animated boxes grid - MUST be first for hover to work */}
        <Boxes />
        
        {/* Radial gradient mask overlay - has pointer-events-none */}
        <div 
          className="absolute inset-0 w-full h-full bg-slate-900 pointer-events-none" 
          style={{
            maskImage: "radial-gradient(circle at center, transparent 0%, white 100%)",
            WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, white 100%)",
            zIndex: 100
          }} 
        />
      </div>

      {/* Foreground content - Assistant */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Assistant />
        </div>
      </div>
    </div>
  );
}

export default App;