import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing, Auth, NotFound } from './page';
import './app.scss';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Auth authRoute='login' />} />
        <Route path='/register' element={<Auth authRoute='register' />}/>
      </Routes>
    </Router>
  );
}

