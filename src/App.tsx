import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import SavedRoutes from "./pages/SavedRoutes";
import Planner from "./pages/Planner";
import Layout from "./components/Layout";
import "./index.css";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/saved" element={<SavedRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
