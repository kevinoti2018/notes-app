
import Header from './components/header/header';
import Footer from './components/footer/footer';
import LandingPage from './pages/LandingPage/LandingPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyNotes from './MyNotes/MyNotes';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
function App() {
  return (
    <BrowserRouter>
      <Header/>
     
      <main >
      <Routes>
      <Route path='/' element={<LandingPage/> } />
      <Route path='/login' element={<LoginPage/> } />
      <Route path='/register' element={<RegisterPage/> } />
      <Route path='/mynotes' element={ <MyNotes/> } />
      
      </Routes>
        
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
