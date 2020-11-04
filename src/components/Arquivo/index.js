import { Container, Content, Divisor, FileName, Tamanho } from "./styles";
import { MdDelete, MdFileDownload, MdPhoto, MdPictureAsPdf} from 'react-icons/md';

function Arquivo (props) {
    return (
        <Container>
            <Content>
                <Divisor>
                    { props.file.originalname.includes('.pdf') ? <MdPictureAsPdf style={{ marginRight: 20 }} size={24} color='#444' /> : <MdPhoto style={{ marginRight: 20 }} size={24} color='#444' /> }
                    <FileName>{props.file.originalname}</FileName>
                    <Tamanho>{props.file.size} kB</Tamanho>
                </Divisor>

                <Divisor>
                    <a type='button' target="_blank" rel='noreferrer' href={props.file.url}>
                        <MdFileDownload size={30} color='#555' />
                    </a>
                    <a type='button' href="#" onClick={() => props.onDelete(props.file.id)}>
                        <MdDelete size={30} color='#555' />
                    </a>
                </Divisor>
            </Content>
        </Container>
    )
}

export default Arquivo;