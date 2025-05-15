import logo from './logo.svg';
import './App.css';
import {Home} from './home';
import {Course} from './course.js';
import {Student} from './student';
import {ApiTest} from './apitest';

import {BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          React JS Frontend
        </h3>
          
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/student">
                Student
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/course">
                Course
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/apitest">
                APITEST
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/student' element={<Student/>}/>
          <Route path='/course' element={<Course/>}/>
          <Route path='/apitest' element={<ApiTest/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
