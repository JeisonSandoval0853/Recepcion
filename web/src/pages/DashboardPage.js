import React from "react";
import ReactDom from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardLayout from '../components/layout/dashboard-layout/DashboardLayout';

const DashboardPage = () => {
  return (
    <div>
      <CssBaseline />
      <DashboardLayout />
      
    </div>
  )
};

ReactDom.render(<DashboardPage />, document.getElementById('root'));
