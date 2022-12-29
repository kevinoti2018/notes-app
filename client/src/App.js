
import Header from './components/header/header';
import Footer from './components/footer/footer';
import LandingPage from './screens/LandingPage/LandingPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyNotes from './MyNotes/MyNotes';
function App() {
  return (
    <BrowserRouter>
      <Header/>
     
      <main >
      <Routes>
      <Route path='/' element={<LandingPage/> } />
      <Route path='/mynotes' element={ <MyNotes/> } />
      
      </Routes>
        
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
