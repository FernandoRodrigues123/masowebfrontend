export function valida(token,login){

    if((login != null && login !== "") && (token != null && token !== "") ){
        return true;
    }else return false;
}
