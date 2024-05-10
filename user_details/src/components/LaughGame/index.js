import { Component } from "react";
import Header from "../Header";

import {MainLaughContainer, LaughContainerTimerCon, Timer, GameName, Emoji, MainHeadingContainer, RuleName, Rule} from './styledComponents'
import GamingContext from "../../context/gamingContext";

class LaughGame extends Component{
    state = {allData: '', joke: {} , isLoading: true, didLaughed: true, timer: 60, isJoke: false, countCam:0 ,setTime: true}

    componentDidMount(){
        this.startGame() 
    }

    startGame = () => {
        setTimeout(() => {this.getData()}, 17000)
        setTimeout(() => { this.getTimer()}, 16000)
        this.speakId = setInterval(() => {
            this.speak();
            setTimeout(() => {this.getRandomJokes()}, 8000)
        }, 10000);
    }

    getTimer = () => {
        this.timerId = setInterval(() => {
            this.setState(prevstate => ({timer: prevstate.timer - 1}))
        }, 1000)
    }

    getRandomJokes = async() => {
        const {didLaughed} = this.state

        const url = 'https://icanhazdadjoke.com/'
        const options = {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
            
        if (response.ok === true){
            const newJoke = data.joke
            console.log(newJoke)
            this.setState({joke: newJoke, isLoading: false, isJoke: true})
        }

        if (didLaughed === false){
            return;
        }
    }

    getData = async() => {
        const {didLaughed} = this.state

        console.log(didLaughed)

        const url = 'http://localhost:3000/smileGame'
        
        const response = await fetch(url)
        const data = await response.text()

        if (response.ok === true){
            this.setState(prevState => ({countCam: prevState.countCam + 1}))
            this.setState({allData: data, didLaughed: false})
        }

        if (didLaughed === false){
            return;
        }
    }

    speak = () => {
        const {joke, isJoke} = this.state
        let count = 0

        console.log(joke)

        if (isJoke && count === 0){
            console.log(typeof(joke))
            let speech = new SpeechSynthesisUtterance(joke)

            let voices = window.speechSynthesis.getVoices();
            
            speech.voice = voices[2]
            speechSynthesis.speak(speech)
            count += 1
        }
    }

    reTry = () => {
        this.startGame()
        this.setState({allData: '', joke: {} , isLoading: true, didLaughed: true, timer: 60, isJoke: false, countCam:0 ,setTime: true})
    }


    clearTimer = () => {
        clearInterval(this.timeId1)
    }

    clearSpeak = () => {
        clearInterval(this.speakId)
    }

    componentWillUnmount(){
        this.clearTimer()
        this.clearSpeak()
    }

    render(){
        const {joke, timer, isLoading, allData, countCam, didLaughed } = this.state
        const newJoke = joke.toString().split(',')

        console.log(allData)
        if (allData === 'You laughed'){
            this.clearTimer()
            this.clearSpeak()
        }

        if(timer === 0){
            this.clearTimer()
            this.clearSpeak()
        }

        return(
            <GamingContext.Consumer>
                {value => {
                    const {token} = value
                    console.log(value)

                    if (token === undefined){
                        window.location.replace('/login')
                    }

                    return (
                        <div>
                            <Header />
                            <MainLaughContainer>
                                {isLoading ? (
                                    <div>
                                        <h1>Get Ready</h1>
                                        <p>Set your camera and prepare not to laugh</p>
                                    </div>
                                ) :  timer <= 0 ? (
                                <div>
                                    <p>Timeout</p>
                                    <button type='button' onClick={this.reTry} >Try Again</button>
                                </div>) : didLaughed ? (
                                    <div>
                                        <LaughContainerTimerCon>
                                            <MainHeadingContainer>
                                                <Emoji>&#128514;</Emoji>
                                                <GameName>Laugh to lose</GameName>
                                                <Emoji>&#128513;</Emoji>
                                            </MainHeadingContainer>
                                            <Timer>{timer}</Timer>
                                        </LaughContainerTimerCon>
                                        <Rule><RuleName>Rules</RuleName>: You laugh, you lose</Rule>
                                        {joke && timer > 0 ? <p>{newJoke[0]}, {newJoke[1]}</p> : undefined}
                                    </div>
                                ) : (
                                    <div>
                                        <h1>You laughed</h1>
                                        <button type='button' onClick={this.reTry} >Try Again</button>
                                    </div>
                                )
                                }
                            </MainLaughContainer>
                        </div>
                    )
                }
                }
            </GamingContext.Consumer>
        )
    }
}

export default LaughGame