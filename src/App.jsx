import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApiProvider } from "./api/ApiContext";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import TableData from "./components/tabledata";
import Page404 from "./components/Page404";
import AddGameForm from "./components/AddGameForm";
import CommentForm from "./components/CommentForm";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LoginWithLocalStorage from "./components/LoginWithLocalStorage";
import UserDashboard from "./components/UserDashboard";

const theme = extendTheme();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApiProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/tabledata" element={<TableData />} /> */}
          <Route path="/addgames" element={<AddGameForm />} />
          {/* <Route path="/comment" element={<CommentForm />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login-Test" element={<LoginWithLocalStorage />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </ApiProvider>
    </ChakraProvider>
  );
}

export default App;
