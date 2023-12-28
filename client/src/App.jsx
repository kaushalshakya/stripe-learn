import Plans from "./components/Plans";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Subscriptions from "./components/Subscriptions";

function App() {
  return (
    <div className="flex flex-col items-center ">
      <Products />
      <Routes>
        <Route path="/plans" element={<Plans />}></Route>
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </div>
  );
}

export default App;
