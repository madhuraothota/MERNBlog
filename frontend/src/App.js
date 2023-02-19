import { Container } from "@mui/system";
import React from "react";
import BlogRoutes from "./routes/BlogRoutes";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Container style={{ paddingBlock: "20px" }}>
        <BlogRoutes />
      </Container>
      <ToastContainer position="top-center" autoClose={4000} />
    </React.Fragment>
  );
}

export default App;
