import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Container
        data-bs-theme="dark"
        className="min-vw-100  min-vh-100  bg-dark text-white-50  "
      >
        <Container className="py-3 ">
          <App />
        </Container>
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);
