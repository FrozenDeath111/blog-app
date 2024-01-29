import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import UpdateBlog from './components/Blog/UpdateBlog';
import Navbar from './components/Navbar/Navbar';
import Register from './components/AuthForms/Register';
import Login from './components/AuthForms/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/:id"
          element={<Blog/>}
        />
        <Route
          path="/update/:id"
          element={<UpdateBlog/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/register"
          element={<Register/>}
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
