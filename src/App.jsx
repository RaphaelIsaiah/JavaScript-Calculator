import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div
      className="app bg-bgd min-h-screen flex items-center justify-center
     px-5 font-display text-center font-bold font-mono text-xl text-pewter uppercase break-all"
    >
      <Calculator />
    </div>
  );
}

export default App;
