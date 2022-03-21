import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Auth } from './page/';
export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={(props: any) => <Auth {...props} authRoute='login' />} />
      </Routes>
    </Router>
  );
}

