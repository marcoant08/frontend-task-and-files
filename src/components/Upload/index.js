import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles'

function Upload (props) {
    const { onUpload } = props;

    function renderDragMessage(isDragActive, isDragReject) {
        if(!isDragActive) {
            return <UploadMessage>Arraste um arquivo aqui.</UploadMessage>
        }

        if(isDragReject) {
            return <UploadMessage type='error'>Arquivo não suportado.</UploadMessage>
        }

        return <UploadMessage type='success'>Solte os arquivos aqui.</UploadMessage>
    }

    return (
        <Dropzone accept="image/png, application/pdf" onDropAccepted={onUpload} >
            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <DropContainer 
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input {...getInputProps()} />
                    {renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
            ) }
        </Dropzone>
    )
}

export default Upload;