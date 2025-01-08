import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/home/Home';
import UserProfile from './pages/user/UserProfile';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/Navbar';
import './App.css'
import SignIn from './auth/signin/SignIn';
import SignUp from './auth/signup/SignUp';
import AuthLayout from './auth/AuthLayout';
import AppProvider from './contexts/AppProvider';

const App = () => {

  return (
    <Router>
      <AuthLayout>
        <Navbar />
      </AuthLayout>
      <AuthProvider>

        <AppProvider>
          <Routes>
            <Route path='/' element={<Navigate to='/auth/signin' />}></Route>

            <Route path="/auth">
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route path="/profile/:userId" element={<PrivateRoute component={UserProfile} />}/>
            <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path="/profile" element={<PrivateRoute component={UserProfile} />} />

          </Routes>
        </AppProvider>

      </AuthProvider>
    </Router>
  );
};

export default App;