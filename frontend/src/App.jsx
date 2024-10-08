import { Container } from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"
import {Outlet} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Header />
     <main className="my-3">
      <Container>
        <Outlet />
      </Container>
     </main>
     <Footer/>
     <ToastContainer />
    </>
  )
}

export default App
