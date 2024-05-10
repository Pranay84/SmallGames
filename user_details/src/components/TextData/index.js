import Popup from 'reactjs-popup'
import { Component } from 'react'
import Header from '../Header'

import './index.css'

import {MainContainer, MainHeading, TextPara, TextContainer, TextArea, Button, Timer, HeadingContainer} from './styledComponents'

class TextSelector extends Component{
    state = {randData: '', userInput: '', isLoading: true, score: 0, isrunning:true, timer: 60, isCompleted: false}

    componentDidMount(){
        this.getTimer()
        this.getData()
    }  
    
    onTextinput = event => {
        this.setState({userInput: event.target.value})
    }

    getTimer = () => {
        const {timer} = this.state
        console.log(timer)

        this.timeId = setInterval(() => {
            this.setState(prevState => ({timer: prevState.timer - 1}))
        }, 1000)
    }

    getData = async() => {
        const url = 'http://localhost:3000/typogame'

        const options = {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, options)
        const data = await response.text()

        this.setState({randData: data, isLoading: false})

    }

    checkText = () => {
        const {userInput, randData} = this.state

        let dataCount = 0;

        if (randData === userInput){
            console.log('You nailed it!')
        }
        else if (randData.length === userInput.length){
            console.log('You failed')
        }
        else{
            for (let i = 0; i < randData.length; i++){
                if (randData[i] === userInput[i]){
                    dataCount += 1
                }
            }

            // console.log(Math.floor((dataCount/randData.length)*100))
            this.setState({score: Math.floor((dataCount/randData.length)*100), isCompleted: true})
        }

    }

    closeTimer = () => {
        clearInterval(this.timeId)
    }

    componentWillUnmount(){
        this.closeTimer()
    }

    render(){
        const {userInput, randData, timer, score, isrunning, isCompleted} = this.state

        if (timer === 0){
            this.checkText()
            this.setState({isrunning: false})
            this.closeTimer()
        }

        return(
           <div>
            <Header />
            {isrunning && (isCompleted === false) ? ( 
            <MainContainer>
            <HeadingContainer>
                <MainHeading>TypoGame</MainHeading>
                <Timer>{timer}</Timer>
            </HeadingContainer>
            <TextPara>{randData}</TextPara>
            <TextContainer>
                <TextArea rows={13} cols={100} placeholder='Please enter your text' value={userInput} onChange={this.onTextinput} ></TextArea>
                <Button type='button' onClick={this.checkText} >Submit</Button>
            </TextContainer>
            </MainContainer>
            ) : (
                <MainContainer className='MainContainer' >
                    <HeadingContainer>
                        <MainHeading>TypoGame</MainHeading>
                        <Timer>{score}</Timer>
                    </HeadingContainer>
                    <div className='MainContainer'>
                        <Popup modal open={this.props}>
                                {close => (
                            <div className='MainPopup'>
                                <div>
                                    <p>Your score is {score}</p>
                                </div>
                                <button
                                type="button"
                                className="trigger-button popupButton"
                                onClick={() => close()}
                                >
                                Close
                                </button>
                            </div>
                            )}
                        </Popup>
                    </div>
                </MainContainer>
            )}
           </div>
        )
    }
}

export default TextSelector