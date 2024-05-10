
const DetailedInfo = props => {
    const {details, name} = props

    console.log(details)

    return (
        <div>
            <p>{name}</p>
            <p>{details.PhoneNumber}</p>
            <p>{details.age}</p>
            <p>{details.city}</p>
            <p>{details.State}</p>
            <p>{details.PIN}</p>
        </div>
    )
}

export default DetailedInfo