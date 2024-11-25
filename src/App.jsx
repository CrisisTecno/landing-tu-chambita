
import LandingPage from './pages/landing/main'

import './App.css'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/app/sign-in/signin";
import SignUp from "./pages/app/sign-up/signup";
import Dashboard from "./pages/app/dashboard/dashboard";
import ChatApp from './pages/app/messages/messages';
import ProfileView from './pages/app/profile/profile';
import Explore from './pages/app/explore/explore';
import ContactPage from './pages/app/contact/contact';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/messages" element={<ChatApp />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/profile" element={<ProfileView />}  />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;