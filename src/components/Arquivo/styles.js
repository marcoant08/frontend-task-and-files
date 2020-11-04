import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 50vw;
    border: 1px solid #999;
    background-color: #eee;
    border-radius: 10px;
    margin: 10px;
`;

export const Content = styled.div`
    display: flex;
    border: 1px solid #999;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    height: 90%;
    width: 90%;
`;

export const Divisor = styled.div`
    display: flex;
`;

export const Tamanho = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #777;
`;

export const FileName = styled.strong`
    font-size: 18px
`;