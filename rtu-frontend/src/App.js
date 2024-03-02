// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './page/Layout';
import CompletedListing from './page/CompletedListing';
import FileStatusListingPage from './page/FileStatusListingPage';
import FlowListing from './pagecomponents/FlowListing';
import ForwardedListing from './page/ForwardedListing';
import { UserProvider, useUser } from './page/UserContext';
import LoginPage from './page/LoginPage';

function App() {
  const { user } = useUser();
  console.log(user);

  return (
      <Router>
        {user ? (
          <Layout>
            <Routes>
              <Route path="/home" element={<FileStatusListingPage />} />
              <Route path="/formwarded" element={<ForwardedListing />} />
              <Route path="/completed" element={<CompletedListing />} />
              <Route path="/flow" element={<FlowListing />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
          <Route path="/" element={<LoginPage />} />
          </Routes>
        )}
      </Router>
  );
}

export default App;
