import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import PriceList from "./pages/PriceList";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<h1>Fakturera</h1>} />
        <Route path="/price-list" element={<PriceList />} />
      </Route>
    </Routes>
  );
}

export default App;
