import './App.scss';
import Nav from './components/Navigation/nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext } from 'react';
import AppRoute from './routes/AppRoute';
import NavAdmin from './components/Admin/Nav/NavAdmin';
import { Oval } from 'react-loader-spinner';
import { UserContext } from './context/adminContext';
import Footer from './components/Navigation/footer';
import { CartProvider } from "react-use-cart";
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      {user && user.isLoading ?
        <div className='loading-container'>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}

          />
          <div>Loading data...</div>
        </div>
        :
        <>
          <div className='app-header'>
            <CartProvider>
              <Nav />
            </CartProvider>
            <NavAdmin />
          </div>
          <div className='App-container'>
            <AppRoute />
          </div>
        </>
      }
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
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