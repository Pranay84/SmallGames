import {redirect} from 'react-router-dom'

const RegistrationSuccess = () => {
    setTimeout(() => {window.location.replace('/login')}, 3000)
    
    return(
        <div>
            <h1>Registration Succeded</h1>
        </div>
    )
}

export default RegistrationSuccess