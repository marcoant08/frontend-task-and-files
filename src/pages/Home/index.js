
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { AccountCircle, Menu } from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react';
import Login from '../Login';
import { AuthContext } from "../../contexts/auth";
import Tarefas from '../Tarefas';
import Arquivos from '../Arquivos';
import GlobalStyle from '../../styles/global';

function Home() {
    const [selected, setSelected] = useState('Login')
    const { signed, sair, usuario } = useContext(AuthContext)

    useEffect(() => {
      if (signed) setSelected('Tarefas')
    }, [signed])

    return (
        <div className="Home">
        <GlobalStyle />
        <AppBar position="static">
            <Toolbar>
                <IconButton color='inherit' edge='start' aria-label='menu'>
                    <Menu/>
                </IconButton>

                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {signed ? `${usuario.email} (${usuario.nivel})` : 'Projeto JotaPê'}
                </Typography>
                
                {signed && <Button color="inherit" onClick={() => setSelected('Tarefas')}>
                    Tarefas
                </Button>}
                
                {signed && <Button color="inherit" onClick={() => setSelected('Arquivos')}>
                    Arquivos
                </Button>}
                
                <Button color="inherit" onClick={() => {
                    if (signed) sair()
                    setSelected('Login')
                }}>
                    { signed ? 'Logout' : 'Login' }
                </Button>

                <IconButton color='inherit' aria-label='account'>
                    <AccountCircle/>
                </IconButton>
            </Toolbar>
        </AppBar>
        
        {
            selected === 'Tarefas' && <Tarefas/>
        }
        
        {
            selected === 'Arquivos' && <Arquivos/>
        }
        
        {
            selected === 'Login' && <Login/>
        }
        </div>
    );
}

export default Home;
