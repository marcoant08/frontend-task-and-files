import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import './styles.css';
import { Button } from '@material-ui/core';
import { AuthContext } from "../../contexts/auth";
import Tarefa from "../../components/Tarefa";
import { TextField } from '@material-ui/core'

function Tarefas(){
    const [tarefa, setTarefa] = useState('')
    const [tarefas, setTarefas] = useState([])
    const { usuario, signed } = useContext(AuthContext);
    const [criavel, setCriavel] = useState(false)
 
    useEffect(() => {
        api.get('listar-tarefas').then(response => {
            setTarefas(response.data)
            console.log(response.data)
        })
    }, []);

    function criarTarefa(){
        if(signed){
            api.post('criar-tarefa', { tarefa, mail: usuario.email }).then(response => {
                api.get('listar-tarefas').then(response => {
                    setTarefas(response.data)
                    setTarefa('')
                }).catch(err => console.log(err))
            })
        } else {
            console.log('Efetue o Login')
        }
    }

    return (
        <div className='container'>
            <div className='container-criar'>
                {
                    criavel ? 
                    <>
                        <TextField
                            id="filled-basic"
                            label='Criar Tarefa'
                            variant="outlined"
                            value={tarefa}
                            style={{ width: '100%', backgroundColor: '#fff',  margin: 30 }}
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 20, color: '#333' }}}
                            onChange={(e) => {
                                setTarefa(e.target.value);
                            }}
                        />

                    <div className='container-buttons'>
                        <Button style={{ margin: 10, width: '100%' }} color='primary' variant='contained' onClick={() => criarTarefa()}>
                            Salvar
                        </Button>
                        <Button style={{ margin: 10, width: '100%' }} color='secondary' variant='contained' onClick={() => setCriavel(false)}>
                            Cancelar
                        </Button>
                    </div>
                    </>
                    :
                    <Button style={{ margin: 10, width: 150 }} color='primary' variant='contained' onClick={() => setCriavel(true)}>
                        Criar Tarefa
                    </Button>
                }
            </div>

            {
                tarefas.map(item => {
                    return <Tarefa key={item.id} task={item}/>
                })
            }
        </div>
    )
}

export default Tarefas