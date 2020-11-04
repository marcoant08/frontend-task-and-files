import { Container, FileInfo, Preview } from './styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdCheckCircle, MdError, MdPictureAsPdf } from 'react-icons/md';

const FileList = ({ files, onDelete }) => (
    <Container>
        {files.map(uploadedFile => (
            <li key={uploadedFile.id}>
                <FileInfo>
                    
                    { uploadedFile.name.includes('.pdf') ? <MdPictureAsPdf style={{ marginRight: 20 }} size={24} color='#444' /> : <Preview src={uploadedFile.preview} /> }
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>
                            {uploadedFile.readableSize}
                            {'  '}
                            {!!uploadedFile.url && <button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>}
                        </span>
                    </div>
                </FileInfo>

                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error && (
                        <CircularProgressbar 
                            value={uploadedFile.progress} 
                            styles={{ root: { width: 30 } }}
                        />
                    )}

                    {/* {uploadedFile.url && (
                        <a
                            href={uploadedFile.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            download
                        >
                            <MdFileDownload style={{ marginRight: 8 }} size={30} color='#222' />
                        </a>
                    )} */}

                    { uploadedFile.uploaded && <MdCheckCircle size={30} color='#78e5d5' /> }
                    { uploadedFile.error && <MdError size={30} color='#e57878' /> }
                </div>
            </li>
        ))}
    </Container>
)

export default FileList;