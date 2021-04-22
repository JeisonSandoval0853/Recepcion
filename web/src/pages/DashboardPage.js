import React from "react";
import ReactDom from 'react-dom';

import ReceptorsView from '../components/views/dashboard/ReceptorsView' 

import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardLayout from '../components/layout/dashboard-layout/DashboardLayout';

const DashboardPage = () => {
  return (
    <div>
      <CssBaseline />
      <DashboardLayout />
      <ReceptorsView/>
      
    </div>
  )
};

ReactDom.render(<DashboardPage />, document.getElementById('root'));
