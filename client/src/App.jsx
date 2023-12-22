import Plans from "./components/Plans";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex flex-col items-center ">
      <Products />
      <Routes>
        <Route path="/plans" element={<Plans />}></Route>
      </Routes>
    </div>
  );
}

export default App;
