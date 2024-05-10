import styled from "styled-components";

export const MainHomeContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 70vh;
width: 80%;
background-color: #0e0c11;
padding: 20px;
`

export const LoginForm = styled.form`
display:flex;
flex-direction: column;
background-color: white;
height: 300px;
width: 25vw;
padding: 20px;
border: 0px;
border-radius: 8px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(255, 255, 255, 0.4) 0px 30px 60px -30px;
`

export const Label = styled.label`
font-size: 16px;
margin-bottom: 5px;
`

export const InputField = styled.input`
padding: 7px;
padding-left: 10px;
margin-bottom: 15px;
border-radius: 3px;
border: 1px solid;
`
export const LoginHeading = styled.h1`
font-size: 24px;
font-weight: 600;
`

export const Button = styled.button`
background-color: #3b71ca;
border: 0px;
height: 33px;
width: 100px;
border-radius: 3px;
align-self: flex-end;
color: white;
margin-top: 13px;
`