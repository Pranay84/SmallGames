import DetailedInfo from "../DetailedInfo"

const EachUser = props => {
    const {details} = props
    const {id, name, uname, email, info} = details

    return(
        <li id={id} >
            <p>User {uname}, {email}</p>
            <DetailedInfo details={info} name={name}/>
        </li>
    )
}

export default EachUser