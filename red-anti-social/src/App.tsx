import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import { Perfil } from "./pages/Perfil";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
