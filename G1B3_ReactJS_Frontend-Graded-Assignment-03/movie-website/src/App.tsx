import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:title" element={<MovieDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
