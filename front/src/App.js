// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Landingpage';
import AdminCourses from './AdminCourses';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/admin" element={<AdminCourses />} />
      </Routes>
    </Router>
  );
};

export default App;
