import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import MainLayout from "./MainLayout";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
