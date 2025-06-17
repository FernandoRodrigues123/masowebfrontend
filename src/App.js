import React, { useState } from 'react';
import EmailPopup from './componente/Lead/loginForm/loginForm.js';
import CadastroForm from './componente/Lead/cadastroForm/cadastroForm.js';
import { AuthProvider } from './tokenServices/tokenLocalStorege.js';
import AtualizacaoForm from './componente/Lead/atualizarForm/atualizacaoForm.js';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAt, seTShowAt] = useState(false)
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
        <button onClick={() => seTShowAt(true)}>Abrir Formulário atualizar</button>
        {showAt && (
          <AtualizacaoForm
            onClose={() => seTShowAt(false)}
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </AuthProvider>

  );
};

export default App;