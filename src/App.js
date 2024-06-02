import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumList from './components/AlbumList/AlbumList';
import AlbumDetail from './components/AlbumDetail/AlbumDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AlbumList />} />
                <Route path="/album/:nasa_id" element={<AlbumDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
