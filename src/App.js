import React from 'react';
import logo from './logo.svg';
import { message, Button } from 'antd'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

function App() {
    return (     
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>         
      </BrowserRouter>
    )
}

export default App;
