import { Container } from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"

import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
    <Header />
     <Container className="my-4 p-4">
       <Outlet />
     </Container>
     <Footer/>
    </>
  )
}

export default App
