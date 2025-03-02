import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Random from './Components/Random';

function App() {
  return (
    <Router>
    <div className="App">
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<Signup />} />
        <Route path="/random" element={<Random />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
