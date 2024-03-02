// Layout component

import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content w-[110%] textCentre">{children}</div>
    </div>
  );
};

export default Layout;
