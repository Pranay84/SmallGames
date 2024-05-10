import { Component, useContext, useState } from "react"
import GamingContext from "../../context/gamingContext"
import Header from "../Header"

import {MainBackground, ProfileDataContainer, Name} from './styledComponents'

class ProfileDetails extends Component{
    static contextType = GamingContext

    constructor(props) {
        super(props);
        //Let's declare an empty profile state here.
        this.state = {
            allData: [],
            isLoading: true
        };
      }

    componentDidMount(){
        const context = this.context
        console.log(context.token)
        this.getUserData(context.token)
    }

    getUserData = async token => {
        console.log(token)

        const url = 'http://localhost:3000/getUsers'
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        }

        const response = await fetch(url, options)
        const data = await response.json()

        if(response.ok === true){
            this.setState({allData: data, isLoading: false})
        }
    }
    
    render(){
        const {allData, isLoading} = this.state
        console.log(allData)

        if (isLoading === false){
            const {id, name, uname, email, info} = allData[0]
            const {PIN, PhoneNumber, State, age, city} = info

            return ( 
                <div>
                    <Header />
                    <MainBackground>
                        <ProfileDataContainer>
                            <Name>Hi! {uname} aka {name} ({age})</Name>
                            <p>We can contact you digitally at: </p>
                            <dl>
                                <dd>Email you at: {email}</dd>
                                <dd>Call you at: {PhoneNumber}</dd>
                            </dl>
                            <p>We can contact you physically at: </p>
                            <dl>
                                <dd>{city}, {State} with postal PIN: {PIN}</dd>
                            </dl>
                        </ProfileDataContainer>
                    </MainBackground>
                </div>
            )
        }else{

            return(
                <div>
                    <Header />
                    <div>
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }
       
    }
}

export default ProfileDetails