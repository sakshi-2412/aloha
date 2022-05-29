import React from 'react';
import './App.css';
import Login from './components/login';
import Navigation from './components/navigation';
import Recognition from './components/recognition';
import Register from './components/register';
import Profile from './components/profile';
import Home from './components/home';
import { AuthProvider } from './components/auth'
import { ReactNotifications } from 'react-notifications-component'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

 return (
    <>
    <ReactNotifications/>
    <AuthProvider>
    <Router>
        <Navigation/>
        <div style={{marginLeft:"270px"}}>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/recognition" element={<Recognition/>}/>
          </Routes>
      </div>
    </Router>
    </AuthProvider>

    <style jsx>{`
    .rnc__notification-container--bottom-right {
      margin-bottom: 50px;
    }
    `}
    </style>
    
    </>
  )

}

export default App;
