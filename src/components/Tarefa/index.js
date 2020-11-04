import { Button, TextField } from '@material-ui/core';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import "./styles.css";

function Tarefa (props) {
    const { usuario, signed } = useContext(AuthContext);
    const [editavel, setEditavel] = useState(false)
    const [verlogs, setVerlogs] = useState(false)
    const [tarefa, setTarefa] = useState(props.task.tarefa)
    const [logs, setLogs] = useState([])

    async function getLogs(){
        console.log(props.task.id)
        if (!verlogs) {
            await api.get(`logs/${props.task.id}`).then((response) => {
                setLogs(response.data)
                console.log(response.data)
            }).catch(err => {
                alert('Erro ao verificar Logs.')
                console.log(err)
            })
        }

        setVerlogs(!verlogs)
    }

    function editarTarefa(){
        if(signed){
            api.put('editar-tarefa', { tarefa, mail: usuario.email, idTarefa: props.task.id }).then(response => {
                console.log('ok')
                setEditavel(false)
            }).catch(err => alert('Erro'))
        } else {
            alert('Você precisa fazer login.')
        }
    }

    function excluirTarefa(){
        api.delete('excluir-tarefa', { data: { mail: usuario.email, idTarefa: props.task.id } }).then(response => {
            console.log('oi')
            alert('ok')
        }).catch(err => alert('Erro'))
    }

    return (
        <div id='container'>
            {editavel ? 
            <>
            <div id='container-text'>
                {/* <Input
                    multiline
                    value={tarefa}
                    inputProps={{min: 0, style: { textAlign: 'center', fontSize: 20 }}}
                    style={{ width: '100%' }}
                    onChange={(e) => {
                        setTarefa(e.target.value);
                    }}
                /> */}
                <TextField
                    id="filled-basic"   
                    label="Tarefa (Modo de Edição Habilitado)" 
                    variant="outlined"
                    value={tarefa} 
                    multiline
                    style={{ width: '100%', backgroundColor: '#fff' }}
                    inputProps={{min: 0, style: { textAlign: 'center', fontSize: 20, color: '#000' }}}
                    onChange={(e) => {
                        setTarefa(e.target.value);
                    }}
                />
            </div>

            <div id='container-buttons'>
                <Button style={{ margin: 10, width: '100%' }} color='primary' variant='contained' onClick={() => editarTarefa()}>
                    Concluir
                </Button>

                <Button style={{ margin: 10, width: '100%' }} color='secondary' variant='contained' onClick={() => setEditavel(false)}>
                    Cancelar
                </Button>
            </div>
            </>
            :
            <>
                <div id='container-text'>
                    {
                        verlogs ?
                        <div id='container-text2'>
                            <br/>
                            {
                                logs.map(item => {
                                    return <p className='text-log' key={item.myid}>{item.registro}</p>
                                })
                            }
                        </div>
                        :
                        <TextField
                            id="filled-basic"  
                            disabled 
                            label='Tarefa'
                            variant="outlined"
                            value={tarefa}
                            multiline
                            style={{ width: '100%', backgroundColor: '#fff' }}
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 20, color: '#333' }}}
                        />
                    }
                </div>

                <div id='container-buttons'>
                    <Button style={{ margin: 10, width: '100%' }} color='primary' variant='contained' onClick={() => {
                        signed ? setEditavel(true) : alert("Você precisa fazer login.")
                    }}>
                        Editar
                    </Button>

                    <Button style={{ margin: 10, width: '100%' }}  color='primary' variant='contained' onClick={() => {
                        signed ? excluirTarefa() : alert("Você precisa fazer login.")
                    }}>
                        Excluir
                    </Button>

                    {
                        usuario?.nivel === 'admin' && 
                        <Button style={{ margin: 10, width: '100%' }}  color='secondary' variant='contained' onClick={() => getLogs()}>
                            Logs
                        </Button>
                    }
                </div>
            </>}
        </div>
    )
}

export default Tarefa