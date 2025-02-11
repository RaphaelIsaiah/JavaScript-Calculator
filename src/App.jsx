import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div
      className="app bg-blue-300 min-h-screen flex items-center justify-center
     px-5 font-display text-center font-bold text-xl text-white uppercase break-all"
    >
      <Calculator />
    </div>
  );
}

export default App;
