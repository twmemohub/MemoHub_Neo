// for Code-Your-Stage students:
// uncomment 'Clerk' Provider and then fill your key into .env to enable clerk feature

import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp
} from "@clerk/clerk-react";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import ArticlePage from "./pages/ArticlePage";
import NotePage from "./pages/NotePage";
import CreateArticlePage from "./pages/CreateArticlePage";

import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Table from "./pages/Table";
import Form from "./pages/Form";
import FormFile from "./pages/Form/File";
import Calendar from "./pages/Form/Calendar";
import Modal from "./pages/MUI/Modal";
import Pagination from "./pages/MUI/Pagination";
import Carousel from "./pages/MUI/Carousel";
import Hook from "./pages/Hook";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
throw new Error('Missing Publishable Key')
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/zoo" 
        element={
          <>
            <SignedIn>
              <Navigate to="/zoo/note" />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route exact path="/zoo/chart" element={<Dashboard />} />
      <Route exact path="/zoo/create" element={<CreateArticlePage />} />
      <Route exact path="/zoo/article" element={<ArticlePage />} />
      <Route exact path="/zoo/note" element={<NotePage />} />

      <Route
        path="/sign-in/*"
        element={<SignIn routing="path" path="/sign-in" />}
      />
      <Route
        path="/sign-up/*"
        element={<SignUp routing="path" path="/sign-up" />}
      />
      <Route
        path="/zoo/chat"
        element={
              <Chat />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </ClerkProvider>
  );
}

export default App;
