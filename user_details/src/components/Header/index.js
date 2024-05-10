import { Link, withRouter } from "react-router-dom"
import './index.css'

import {Logo, MainUnorderedList, Container, MainContainer, UnorderedList, ListItem, UserProfile, UserProfileIcon, UserProfileContainer} from './styledComponents'
import GamingContext from "../../context/gamingContext"
import { useState } from "react"

const Header = () => {
    const [show, setShow] = useState(false)
    const [isLogged, setLogged] = useState(false)
    const [User, setUser] = useState(undefined)

    console.log(show)

    return (
    <GamingContext.Consumer>
        {value => {
            const {token, getToken} =value

            if (token !== undefined){
                setUser(token.split(' ')[0])
                setLogged(true)
            }else{
                setUser('')
                setLogged(false)
            }

            const changeToken = () => {
                getToken(undefined)
            }

            return (
            <MainContainer>
                <MainUnorderedList>
                    <Link to='/'>
                        <li>
                            <Logo src='https://res.cloudinary.com/daez0htwr/image/upload/v1714664056/nlbbctii5pcjdrufzagh.png' />
                        </li>
                    </Link>
                    { isLogged && User ? 
                    (
                        <div>
                            <UserProfileContainer>
                                <UserProfileIcon onClick={() => {setShow((prev) => !prev)}}>
                                    <UserProfile>{User[0]}</UserProfile>
                                </UserProfileIcon>
                                {show && (<UnorderedList className="ProfileContainer">
                                    <li>Hi, {User}!</li>
                                    <Link to='/userdetails' ><li>Profile</li></Link>
                                    <button onClick={changeToken}>Sign Out</button>
                                </UnorderedList>)}
                            </UserProfileContainer>
                        </div>
                    ) : (
                    <Container>
                        <Link to='/login' className="linkClass" >
                            <ListItem>
                                Login 
                            </ListItem>
                        </Link>
                        <Link to='/register' className="linkClass" >
                            <ListItem>
                                Registration
                            </ListItem>
                        </Link>
                    </Container>)}
                </MainUnorderedList>
            </MainContainer>
            )
        }}
    </GamingContext.Consumer>
)}

export default Header