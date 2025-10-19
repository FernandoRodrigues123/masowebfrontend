import React, { useState } from 'react';
import EmailPopup from './componente/Lead/loginForm/loginForm.js';
import { AuthProvider } from './tokenServices/tokenLocalStorege.js';
import AtualizacaoForm from './componente/Lead/atualizarForm/atualizacaoForm.js';
import DeletarForm from './componente/Lead/deletarForm/deletar.js';
import LoginAdmForm from './componente/Adm/Login/LoginAdmForm.js';
import CadastroAdmForm from './componente/Adm/Cadastro/CadastroAdmForm.js';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAt, setShowAt] = useState(false)
  const [show, setShow] = useState(false)
  const [showIt, setShowIt] = useState(false)
  const [mostrarAdmFormCadastro, setMostrarAdmFormCadastro] = useState(false)
  const handleSubmit = async (data) => {

    await new Promise(resolve => setTimeout(resolve, 1000));


  };

  return (
    <AuthProvider>
      <div>
        <button onClick={() => setShowPopup(true)}>Abrir Formulário</button>
        {showPopup && (
          <EmailPopup
            onClose={() => setShowPopup(false)}
            onSubmit={handleSubmit}
          />
        )},
        <button onClick={() => setShowAt(true)}>Abrir Formulário atualizar</button>
        {showAt && (
          <AtualizacaoForm
            onClose={() => setShowAt(false)}
            onSubmit={handleSubmit}
          />
        )}
        <button onClick={() => setShow(true)}>Abrir Formulário deletar</button>
        {show && (
          <DeletarForm
            onClose={() => setShow(false)}
            onSubmit={handleSubmit}
          />
        )}
        <button onClick={() => setShowIt(true)}>Abrir Formulário adm login</button>
        {showIt && (
          <LoginAdmForm
            onClose={() => setShowIt(false)}
            onSubmit={handleSubmit}
          />
        )}
        <button onClick={() => setMostrarAdmFormCadastro(true)}>Abrir Formulário adm cadastro</button>
        {mostrarAdmFormCadastro && (
          <CadastroAdmForm
            onClose={() => setMostrarAdmFormCadastro(false)}
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </AuthProvider>

  );
};

export default App;