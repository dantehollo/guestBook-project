import React, { Component } from 'react'
import axios from 'axios'

export default class Test extends Component {
    state = {
        firstName: ""
    }

    componentDidMount() {
        axios.get('/api/guestBook')
            .then((res) => {
                // this.setState({working: res.data})
                console.log(res.data)
            })
    }

    render(){
        return(
            <div>
                <h1>{this.state.working}</h1>
            </div>
        )
    }
}