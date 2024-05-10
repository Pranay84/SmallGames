import { useState } from "react";
import {useNavigate } from 'react-router-dom'
import Header from "../Header";

import {MainHomeContainer, LoginForm, Label, InputField, Button, LoginHeading} from './styledComponents'
import GamingContext from "../../context/gamingContext";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [responseTxt, setResponse] = useState([])
    const navigate = useNavigate();

    const onUsernameChange = event => {
        setUsername(event.target.value)
    }

    const onPasswordChange = event => {
        setPassword(event.target.value)
    }

    const loginStatus = responseText => {
        console.log(responseText)
        if (responseText !== undefined){
            setTimeout(() => { navigate('/loginSucces') }, 1000)
        }
    }

    const onFormSubmit = async event => {
        event.preventDefault()

        // console.log(password)

        const userLogin = {uname: username, password}

        const url = 'http://localhost:3000/login'
        const options = {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLogin)
        }

        const response = await fetch(url, options)
        const responseText = await response.json()
        console.log(responseText)
        setResponse(responseText)
        loginStatus(responseText)
    }

        return(
            <GamingContext.Consumer>
                {value => {
                    const {token, getToken} = value
                    console.log(responseTxt.jwtToken)
                    if (responseTxt.jwtToken !== undefined){
                        const response = username + " " + responseTxt.jwtToken
                        getToken(response)
                        console.log(1)
                    }

                    console.log(token)

                    return(
                        <div>
                            <Header />
                            <MainHomeContainer>
                                <LoginForm onSubmit={onFormSubmit} >
                                    <LoginHeading>User Login</LoginHeading>
                                    <Label>Username: </Label>
                                    <InputField placeholder="Enter your Username" type="text" value={username} onChange={onUsernameChange} />
                                    <Label>Password: </Label>
                                    <InputField placeholder="Enter your Password" type="password" value={password} onChange={onPasswordChange} />
                                    <Button type='submit' >Submit</Button>
                                </LoginForm>
                            </MainHomeContainer>
                        </div>
                    )
                }}
            </GamingContext.Consumer>
        )
    }

export default Login