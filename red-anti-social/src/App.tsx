import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/Navbar";
import Home from "./pages/Home"




function App() {
  return (
    <div>
  <NavbarApp />
     
     <Routes>
        <Route path="/" element={<Home />} />
    
      </Routes>
    </div>
  )
    
}

export default App;