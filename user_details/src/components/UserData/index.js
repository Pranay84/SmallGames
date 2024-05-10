import {Component} from 'react'
import EachUser from '../EachUser'

class UserData extends Component{
    state = {allData:[], isLoading:true}

    
    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()

        if (response.ok === true){
            this.setState({allData: data, isLoading: false})
        }
    }
    

    render(){
        const {allData, isLoading} = this.state
        console.log(allData)

        return (
            <div>
                {isLoading? (<div><h1>Loading...</h1></div>):(<ul>{allData.map((each) => <EachUser key={each.id} details={each} />)}</ul>)}
            </div>
        )
    }
}

export default UserData