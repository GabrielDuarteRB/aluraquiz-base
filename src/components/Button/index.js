import styled from 'styled-components'

const Button = styled.button `
    background: ${({theme}) => theme.colors.success};
    border-radius: 5px;
    border: none;
    color: ${({theme}) => theme.colors.contrastText};
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    height: 30px;
    width: 100%;
`

export default Button;