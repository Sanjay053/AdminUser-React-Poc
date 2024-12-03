import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignUpFormComponent from './component/SignUpFormComponent';
import HomeComponent from './component/HomeComponent';
import SignInFormComponent from './component/SignInFormComponent';
import UpdateComponent from './component/UpdateComponent';
import { AuthProvider } from './component/Auth';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<SignInFormComponent />} />
          <Route path='/signup' element={<SignUpFormComponent />} />
          <Route path='/home' element={<HomeComponent />} />
          <Route path='/update/:userId' element={<UpdateComponent />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}


export default App;
