import { createContext, useState } from "react";
import api from '../services/api'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  async function acessar(email, senha) {
    api.post('login', { email, senha }).then((response) => {
        console.log(response.data)
        setUsuario(response.data)
    }).catch(err => {
        alert(err.response.data.erro)
    })
  }

  async function criar() {
    
  }

  async function sair() {
    api.get('logout').then(response => {
        setUsuario(null)
        console.log('Desconectado.')
    }).catch(err => {
        console.log(err)
    })
  }

  async function editarUsuario(usuario) {
    setUsuario(usuario)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!usuario,
        usuario,
        acessar,
        sair,
        criar,
        editarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
