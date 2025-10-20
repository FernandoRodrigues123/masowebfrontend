import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Forms from './componente/Forms/Forms';
import Perfil from './componente/Perfil/perfil';
import Validar from './componente/validar/validar';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: "/", element: <Forms /> },
  { path: "/perfil", element: <Perfil /> },
  {path: "/validar/*", element:<Validar/>}
]);
root.render(

    <React.StrictMode>
     <RouterProvider router={router} />
    </React.StrictMode>

);


reportWebVitals();
