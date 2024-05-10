import { Component } from "react";
import Header from "../Header";

import {MainRegistrationContainer, MainForm, MainRegHeading, InputContainer, NameInput, UserPassContainer, InputField, AgeInput, EmailInput, UserInput, Address, PhoneInput, AddressInputContainer, Button} from './styledComponents'

class Registration extends Component{
    state = {name: '', username: '', password: '', email: "", age: undefined, phone: undefined, city: '', State: '', pin: undefined}

    onChangeName = event => {
        this.setState({name: event.target.value})
    }

    onUsernameChange = event => {
        this.setState({username: event.target.value})
    }

    onPassChange = event => {
        this.setState({password: event.target.value})
    }

    onEmailChange = event => {
        this.setState({email: event.target.value})
    }

    onAgeChange = event => {
        this.setState({age: parseInt(event.target.value)})
    }

    onPhoneChange = event => {
        this.setState({phone: parseInt(event.target.value)})
    }

    onCityChange = event => {
        this.setState({city: event.target.value})
    }

    onStateChange = event => {
        this.setState({State: event.target.value})
    }

    onpinChange = event => {
        this.setState({pin: event.target.value})
    }

    onFormSubmit = async event => {
        event.preventDefault()

        const {name, username, password, email, age, phone, city, State, pin} = this.state

        const info = {
            age, 
            PhoneNumber: phone,
            city,
            State,
            PIN: pin
        }

        console.log(pin)

        const userInfo = {
            name,
            uname: username,
            password,
            email,
            info
        }

        console.log(userInfo)

        const url = 'http://localhost:3000/registration'

        const options = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        // const data1 = await response.json()

        console.log(data)
        console.log(response)
        if (data === 'User already exists'){
            window.location.replace('/login')
        }else if (data === 'Registration Successfull'){
            window.location.replace('/regSuccess')
        }
    }

    render(){
        const {name, username, password, email, age, phone, city, State, pin} = this.state

        return(
            <div>
                <Header />
                <MainRegistrationContainer>
                    <MainForm onSubmit={this.onFormSubmit}>
                        <MainRegHeading>Registration</MainRegHeading>
                        <InputContainer>
                            <label>Name: </label>
                            <NameInput placeholder="Enter Your name" value={name} onChange={this.onChangeName} />
                        </InputContainer>
                        <UserPassContainer>
                            <InputContainer>
                                <label>Username: </label>
                                <UserInput placeholder="Enter Username" value={username} onChange={this.onUsernameChange} />
                            </InputContainer>
                            <InputContainer>
                                <label>Password: </label>
                                <UserInput placeholder="Enter Password" type='password' value={password} onChange={this.onPassChange} />
                            </InputContainer>
                        </UserPassContainer>
                        <UserPassContainer>
                            <InputContainer>
                                <label>Age: </label>
                                <AgeInput placeholder="Enter you age" value={age} onChange={this.onAgeChange} />
                            </InputContainer>
                            <InputContainer>
                                <label>Email: </label>
                                <EmailInput type='email' placeholder="Enter your Email" value={email} onChange={this.onEmailChange} />
                            </InputContainer>
                        </UserPassContainer>
                        <Address>Address</Address>
                        <div>
                            <InputContainer>
                                <label>Phone Number:</label>
                                <PhoneInput placeholder="Enter your phone number" value={phone} onChange={this.onPhoneChange} />
                            </InputContainer>
                            <AddressInputContainer>
                                <InputContainer>
                                    <label>City: </label>
                                    <InputField placeholder="Enter your city" value={city} onChange={this.onCityChange} />
                                </InputContainer>
                                <div>
                                    <label>State: </label>
                                    <UserInput  placeholder="Enter your state" value={State} onChange={this.onStateChange} />
                                </div>
                                <div>
                                    <label>PIN: </label>
                                    <InputField  placeholder="PIN" value={pin} onChange={this.onpinChange} />
                                </div>
                            </AddressInputContainer>
                        </div>
                        <Button type='submit' >Submit</Button>
                    </MainForm>
                </MainRegistrationContainer>
            </div>
        )
    }
}

export default Registration