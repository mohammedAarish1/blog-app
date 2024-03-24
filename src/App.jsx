import {  Route, Routes } from 'react-router-dom';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import AddEdit from './pages/AddEdit';
import About from './pages/About';
import PageNoFound from './pages/PageNoFound';
import Header from './components/Header';
import Auth from './pages/Auth';
import { useFirebaseContext } from './context/FirebaseContext';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {

  const { user } = useFirebaseContext();

  return (
    <div>
      <ToastContainer position='top-center' />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog-detail/:id' element={<BlogDetail />} />
        <Route path='/create-post' element={user ? <AddEdit /> : <Auth />} />
        <Route path='/update-post/:id' element={<AddEdit />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='*' element={<PageNoFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
