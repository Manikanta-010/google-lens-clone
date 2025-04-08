import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ImageSearch from './ImageSearch';
import ImageResults from './ImageResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/image-search" element={<ImageSearch />} />
        <Route path="/image-results" element={<ImageResults />} />
      </Routes>
    </Router>
  );
}

export default App;