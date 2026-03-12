import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import PriceList from "./pages/PriceList";
import AutheticatedLayout from "./layouts/AutheticatedLayout";
import AuthPageLayout from "./layouts/AuthPageLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthPageLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AutheticatedLayout />}>
        <Route path="/price-list" element={<PriceList />} />
      </Route>
    </Routes>
  );
}

export default App;
