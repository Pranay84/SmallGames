import styled from "styled-components";

export const MainRegistrationContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #0e0c11;
width: 80%;
height: 80vh;
padding: 20px;
`

export const MainForm = styled.form`
display: flex;
flex-direction: column;
background-color: white;
padding: 20px;
width: 510px;
height: 420px;
border-radius: 6px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(255, 255, 255, 0.4) 0px 30px 60px -30px;
`

export const MainRegHeading = styled.h1`
font-size: 25px;
font-weight: 600;
`

export const Address = styled.p`
font-size: 18px;
font-weight: 600;
`

export const InputContainer = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
margin-bottom: 15px;
`

export const NameInput = styled.input`
width: 84%;
padding: 3px;
padding-left: 10px;
`

export const UserPassContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 15px;
align-self: flex-start;
`

export const UserInput = styled.input`
width: 142px;
padding: 5px;
padding-left: 10px;
` 

export const AgeInput = styled.input`
width: 100px;
padding: 3px;
padding-left: 10px;
`

export const EmailInput = styled.input`
width:260px;
padding: 3px;
padding-left: 10px;
`

export const PhoneInput = styled.input`
width: 355px;
padding: 3px;
padding-left: 10px;
margin-left: 10px
`

export const AddressContainer = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
margin-top: 15px;
margin-bottom: 20px;
`

export const AddressInputContainer = styled.div`
display: flex;
flex-direaction: row;
gap: 5px;
`

export const InputField = styled.input`
width: 91px;
padding: 3px;
padding-left: 10px;
`

export const Button = styled.button`
width: 100px;
padding: 6px;
border: 0px;
border-radius: 3px;
background-color: #3b71ca;
color: white;
align-self: flex-end;
margin-right: 5px;
`