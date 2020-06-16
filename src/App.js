import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Modal from './components/Modal';
import LogIn from './components/Login';
import NoMatch from './components/NoMatch';
import Admin from './components/admin/Admin';
import Courses from './components/Courses';
import Home from './components/Home';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import CoursesAdmin from './components/admin/CoursesAdmin';
import InstructorAdmin from './components/admin/InstructorAdmin';
import YogaClassAdmin from './components/admin/YogaClassAdmin';
import UserPage from './components/UserPage';
function App() {
  const {
    auth: { isAdmin, isLoggedIn }
  } = useContext(AuthContext);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const toggleModalLogin = () => setShowModalLogin(!showModalLogin);
  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? 'Logout' : 'Login'}
        toggleModal={toggleModalLogin}
      />
      <hr />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='userPage/:user' element={<UserPage />} />
          <Route path='courses' element={<Courses />} />

          {isAdmin ? (
            <Route path='admin' element={<Admin />}>
              <Route path='coursesAdmin' element={<CoursesAdmin />} />
              <Route path='instructorAdmin' element={<InstructorAdmin />} />
              <Route path='yogaClassAdmin' element={<YogaClassAdmin />} />
            </Route>
          ) : (
            <Navigate to='/login-out' />
          )}

          <Route
            path='/login-out'
            element={
              showModalLogin ? (
                <Modal toggleModalLogin={toggleModalLogin}>
                  <LogIn
                    loginMsg={isLoggedIn ? 'Logout' : 'Login'}
                    toggleModalLogin={toggleModalLogin}
                  />
                </Modal>
              ) : null
            }
          />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
