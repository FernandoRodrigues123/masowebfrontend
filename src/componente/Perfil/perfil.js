import AdmAutenticado from "../Adm/AdmAutenticado/AdmAutenticado";
import LeadAutenticado from "../Lead/leadAutenticado/LeadAutenticado";

const Perfil = () => {
  const isADM = localStorage.getItem("isADM");

  if (isADM === "true") {
    return <AdmAutenticado />;
  } 
  
  if (isADM === "false") {
    return <LeadAutenticado />;
  }

  // Caso não esteja autenticado ou o valor esteja indefinido
  return <p>Você precisa estar logado para ver o perfil.</p>;
};

export default Perfil;
