import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/LoginContext";
import App from "./App"; 

// Agregamos el signo '!' al final para decirle a TS "quédate tranquilo que este elemento existe"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
   <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);