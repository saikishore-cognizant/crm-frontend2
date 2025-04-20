import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Customers from './components/customers/Customers';
import Dashboard from './components/Dashboard';
import AllCustomers from './components/customers/AllCustomers';
import AddCustomer from './components/customers/AddCustomer';

import Form from './components/Form';
import './App.css';
const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/customers/:id" element={<Customers token={token} />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/allcustomers" element={<AllCustomers />} /> 
        <Route path="/addcustomer" element={<AddCustomer />} /> 
        {/* <Route path="/updatecustomer" element={<UpdateCustomer />} /> 
        <Route path="/deletecustomer" element={<DeleteCustomer />} />  */}
        <Route path="/" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
