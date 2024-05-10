import Header from "../Header"
import { Component, useContext, useState } from "react"
import './index.css'

import {MainContainer, Button, Heading, Para} from './styledComponents'
import GamingContext from "../../context/gamingContext"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [game, setGame] = useState(undefined)
    const {gameId} = useContext(GamingContext)
    const navigate = useNavigate()

    // console.log(gameId)

    const getGame = () => {
        switch(gameId){
            case 0:
                setGame('You got a Typing Game')
                setTimeout(() => {navigate('/typogame')}, 2000)
                break
            case 1:
                setGame('Try not to laugh')
                setTimeout(() => {navigate('/laughgame')}, 2000)
            default:
                break
        }
    }

    return (
        <GamingContext.Consumer>
            {value => {
                const {gameId, token, getGameId} = value
                const gameSelector = () => {
                    const gameID = Math.floor(Math.random()*2)
                    getGameId(undefined)
                    getGameId(gameID)
                    getGame()
                    console.log(token)
                }
    
                return(
                    <div>
                        <Header />
                        <MainContainer>
                            <Heading className="Mainheading" >Come Let's Play Games</Heading>
                            <Para>Tired of playing a big AAA or AA games, you are right up the ally. Come play our random browser games and enjoy your time passing it.</Para>
                            <Button onClick={gameSelector} >Try it</Button>
                            {game && <p>{game}</p>}
                        </MainContainer>
                    </div>
                )
            }}
        </GamingContext.Consumer>
    )
}

export default Home