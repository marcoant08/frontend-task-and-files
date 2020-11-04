import { useContext, useEffect, useState } from 'react';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import { All, Container, Content, ContainerButtons } from './styles';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from '../../services/api';
import Arquivo from '../../components/Arquivo';
import { AuthContext } from '../../contexts/auth';
import { Button } from '@material-ui/core';

function Arquivos () {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [arquivos, setArquivos] = useState([]);
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        api.get('listar-arquivos').then(response => {
            setArquivos(response.data)
            console.log(response.data)
        }).catch(err => {
            alert('Erro ao recuperar arquivos.')
        });
    }, [])

    const handleUpload = files => {
        const aux = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }))

        //setUploadedFiles(uploadedFiles.concat(aux));    
        //setUploadedFiles(uploadedFiles.concat(aux));    
        setUploadedFiles(aux);
        //uploadedFiles.forEach(processUpload);
    }

    const updateFile = (id, data) => {
        /* const aux = uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
        });

        setUploadedFiles(aux) */
        const aux = uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
        });

        setUploadedFiles(aux)
        //setUploadedFiles((oldArray) => [ ...aux ]);
    }

    const processUpload = (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('enviar-arquivo', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                updateFile(uploadedFile.id, { progress })
            }
        }).then(response => {
            updateFile(uploadedFile.id, {
                uploaded: true,
                id: response.data.id,
                url: response.data.url,
            })

            alert('Enviado com sucesso!')
            
            api.get('listar-arquivos').then(response => {
                setArquivos(response.data)
                console.log(response.data)
            }).catch(err => {
                alert('Erro ao recuperar arquivos.')
            });
        }).catch(() => {
            updateFile(uploadedFile.id, {
                error: true
            })
        })
    }

    const handleDelete = async id => {
        await api.delete(`excluir-arquivo/${id}`);
        setUploadedFiles(uploadedFiles.filter(item => item.id !== id))
    }

    const handleDelete2 = async id => {
        await api.delete(`excluir-arquivo/${id}`).then(response => {
            setArquivos(arquivos.filter(item => item.id !== id))
        }).catch(err => alert('Erro ao deletar'))
        
    }

    return (
        <All>
            <br/>
            { usuario.nivel === 'admin' && <Container>
                <Content>
                    <Upload onUpload={handleUpload} />
                    {
                        !!uploadedFiles.length && (
                            <FileList files={uploadedFiles} onDelete={handleDelete} />
                        )
                    }

                    { !!uploadedFiles.length && <ContainerButtons>
                        <Button style={{ marginLeft: 10, marginRight: 10, marginTop: 30, width: 100 }} color='primary' variant='contained' onClick={() => { 
                            uploadedFiles.forEach(processUpload);
                            console.log(uploadedFiles)
                        }}>
                            Enviar
                        </Button>
                        
                        <Button style={{ marginLeft: 10, marginRight: 10, marginTop: 30, width: 100 }} color='secondary' variant='contained' onClick={() => { setUploadedFiles([]) }}>
                            Cancelar
                        </Button>
                    </ContainerButtons> }

                </Content>
            </Container> }
                {
                    arquivos.map(item => {
                        return <Arquivo key={item.id} file={item} onDelete={handleDelete2}/>
                    })
                }
        </All>
    )
}

export default Arquivos;