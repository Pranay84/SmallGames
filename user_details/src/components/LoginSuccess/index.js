import { useNavigate } from "react-router-dom"

import {MainLogSuccessCon, MainLogHeading} from './styledComponents'

const LoginSuccess = () => {
    const navigate = useNavigate()
    setTimeout(() => { navigate ('/') }, 1500)

    return(
        <MainLogSuccessCon>
            <MainLogHeading>Login Successfull</MainLogHeading>
        </MainLogSuccessCon>
    )
}

export default LoginSuccess