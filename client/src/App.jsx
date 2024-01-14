import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const sendMessage = () => {};

  return (
    <div>
      {/* <div>QR Login</div> */}
      <div className="w-[60%] border-2 border-blue-800 mx-auto my-4">
        <div className="h-[300px]"></div>
        <div className="m-3 flex">
          <input
            type="text"
            placeholder="Messages..."
            className="p-2 flex-1 border-2 border-red-500 outline-none"
          />
          <button onClick={sendMessage} className="bg-red-500 p-2 text-cyan-50">
            {" "}
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
