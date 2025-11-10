import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forms from './componente/Forms/Forms';
import Perfil from './componente/Perfil/perfil';
import Validar from './componente/validar/validar';
import ProdutoForm from './componente/Produto/ProdutoForm/ProdutoForm';
import BuscaProdutos from './componente/Produto/BuscaProdutos/BuscaProdutos';
import BuscaPorId from './componente/Produto/BuscaPorId/BuscaPorId';
import ProdutoAtualizarForm from './componente/Produto/AtualizarProduto/ProdutoAtualizaForm';
import DeletarProdutoForm from './componente/Produto/DeletarProduto/DeletarProdutoForm';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: "/", element: <Forms /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/validar/*", element: <Validar /> },
  { path: "/produto/cadastrar", element: <ProdutoForm /> },
  { path: "/produtos", element: <BuscaProdutos /> },
  { path: "/produto/:id", element: <BuscaPorId /> },
  { path: "/produto/atualizar/:id", element: <ProdutoAtualizarForm /> },
  { path: "/produto/deletar/:id", element: <DeletarProdutoForm /> }


]);
root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);


reportWebVitals();
