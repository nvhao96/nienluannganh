import Nav from './components/Navigation/Nav';
import { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import Register from './components/Register/Register';
import Users from './components/ManagerUsers/Users';
// import { useEffect } from 'react';

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <Router>
      <div className='app-container'>
        {account && !_.isEmpty(account) && account.isAuthenicated &&
          <Nav />}

        <Switch>
          <Route path="/news">
            news
          </Route>
          <Route path="/about">
            about
          </Route>
          <Route path="/contact">
            contact
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">
            404 not found
          </Route>
        </Switch>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </Router>
  );
}

export default App;
