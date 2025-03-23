import { ToastContainer } from "react-toastify";
import Landing from "./components/Landing.jsx";

function App() {
  return (
    <>
      <div className="z-[50] absolute top-4 left-6 text-white text-xl font-bold">
        Shortly
      </div>
      <Landing />
      <ToastContainer />
    </>
  );
}

export default App;
