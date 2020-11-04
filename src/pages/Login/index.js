
import { Button, Grid, TextField, InputAdornment } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import './styles.css';

function Login() {
    const [email, setEmail] = useState('marcoant008@gmail.com')
    const [senha, setSenha] = useState('123456')
    const { acessar, sair, signed, usuario } = useContext(AuthContext)
    const [recuperar, setRecuperar] = useState(false)
    const [emailRecuperacao, setEmailRecuperar] = useState('')

    function rec () {
      api.post('recuperar-senha', { email: emailRecuperacao }).then(response => {
        alert(`Um link para recuperação de senha foi enviado para ${emailRecuperacao}.`)
      }).catch(err => {
        //alert(err.data.response)
        alert(err.response.data.erro)
      })
    }

  return (
    <div className="Login">
      { recuperar ?
        <Grid container style={{ minHeight: '70vh' }}>

        <Grid container alignItems="center" direction="column" justify='space-between' >
          <div />

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
            <Grid container justify='center'>
              <img src='https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' width={200} alt='logo' />
            </Grid>

            <TextField 
              label="E-mail de recuperação" 
              margin='normal'
              value={emailRecuperacao}
              onChange={(e) => setEmailRecuperar(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>
              }} />

            <div style={{ height: 20 }}/>

            <Button color='primary' variant='contained' onClick={rec}>
              Enviar Link
            </Button>
            <br/>
            <Button color='secondary' variant='contained' onClick={() => setRecuperar(false)}>
              Cancelar
            </Button>
          </div>
          
          <div />
        </Grid>
      </Grid>
       :
      ( signed ?
        <Grid container style={{ minHeight: '70vh' }}>

        <Grid container alignItems="center" direction="column" justify='space-between' >
          <div />
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
              <h3>Conectado com {usuario.email}</h3>
              <br/>
              <Button color='primary' variant='contained' onClick={() => sair()}>
                  Desconetar
              </Button>
          </div>
          
          <div />
        </Grid>
      </Grid>
      :
      <Grid container style={{ minHeight: '70vh' }}>

        <Grid container alignItems="center" direction="column" justify='space-between' >
          <div />

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
            <Grid container justify='center'>
              <img src='https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' width={200} alt='logo' />
            </Grid>

            <TextField 
              label="E-mail" 
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>
              }} />
            <TextField 
              label="Senha" 
              margin='normal'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockRounded/></InputAdornment>
              }} />

            <div style={{ height: 20 }}/>

            <Button color='primary' variant='contained' onClick={() => acessar(email, senha)}>
              Acessar
            </Button>

            <div style={{ height: 20 }}/>

            <Button onClick={() => setRecuperar(true)}>
              Esqueceu sua senha?
            </Button>
          </div>
          
          <div />
        </Grid>
      </Grid>)}
    </div>
  );
}

export default Login;
