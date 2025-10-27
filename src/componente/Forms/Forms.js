import { useState } from "react";
import CadastroAdmForm from "../Adm/Cadastro/CadastroAdmForm";
import LoginAdmForm from "../Adm/Login/LoginAdmForm";
import AtualizacaoForm from "../Lead/atualizarForm/atualizacaoForm";
import DeletarForm from "../Lead/deletarForm/deletar";
import { AuthProvider } from "../../tokenServices/tokenLocalStorege";
import LoginForm from "../Lead/loginForm/loginForm";
import CadastroForm from "../Lead/cadastroForm/cadastroForm";
import AtualizarAdmForm from "../Adm/Atualizar/atualizarForm";
import DeleteFormAdm from "../Adm/DeleteFormAdm/DeleteFormAdm";

const Forms = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showCadastroLead, setShowCadastroLead] = useState(false);
    const [showAt, setShowAt] = useState(false)
    const [show, setShow] = useState(false)
    const [showIt, setShowIt] = useState(false)
    const [mostrarAdmFormCadastro, setMostrarAdmFormCadastro] = useState(false)
    const [mostrarAdmFormAtualiza, setMostrarAdmFormAtualiza] = useState(false)
    const [mostrarAdmFormDel, setMostrarAdmFormDel] = useState(false)
    const handleSubmit = async (data) => {

        await new Promise(resolve => setTimeout(resolve, 1000));


    };

    return (
        <AuthProvider>
            <div>
                <button onClick={() => setShowPopup(true)}>Abrir Formulário login lead</button>
                {showPopup && (
                    <LoginForm
                        onClose={() => setShowPopup(false)}
                        onSubmit={handleSubmit}
                    />
                )},
                <button onClick={() => setShowCadastroLead(true)}>Abrir Formulário cadastro lead</button>
                {showCadastroLead && (
                    <CadastroForm
                        onClose={() => setShowCadastroLead(false)}
                        onSubmit={handleSubmit}
                    />
                )},

                <button onClick={() => setShowAt(true)}>Abrir Formulário atualizar lead</button>
                {showAt && (
                    <AtualizacaoForm
                        onClose={() => setShowAt(false)}
                        onSubmit={handleSubmit}
                    />
                )}
                <button onClick={() => setShow(true)}>Abrir Formulário deletar lead</button>
                {show && (
                    <DeletarForm
                        onClose={() => setShow(false)}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
                
            <div>
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
                <button onClick={() => setMostrarAdmFormAtualiza(true)}>Abrir Formulário adm atualiza</button>
                {mostrarAdmFormAtualiza && (
                    <AtualizarAdmForm
                        onClose={() => setMostrarAdmFormAtualiza(false)}
                        onSubmit={handleSubmit}
                    />
                )}

                <button onClick={() => setMostrarAdmFormDel(true)}>Abrir Formulário adm atualiza</button>
                {mostrarAdmFormDel && (
                    <DeleteFormAdm
                        onClose={() => setMostrarAdmFormDel(false)}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
       
        </AuthProvider >
    )
}

export default Forms;