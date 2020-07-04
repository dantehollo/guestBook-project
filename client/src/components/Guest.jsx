import React, { Component } from 'react'
import axios from 'axios'

export default class Guest extends Component {
    state = {
        firstName: '',
        lastName: '',
        message: '',
    }

    // DOES NOTHING
    componentDidMount() {
        this.refreshGuest()
    }
    
    // get one DOES NOT WORK
    refreshGuest = () => {
        const guestId = this.props.guestId
        axios.get(`/api/guestBook/${guestId}`)
            .then((res) => {
                this.setState(res.data)
            })
    }

    // delete
     onDeleteGuestClick = () => {
        const guestId = this.props.guestId
        axios.delete(`/api/guestBook/${guestId}`)
     }    

    render() {
        const {firstName, lastName, message} = this.state
        return (
                <div>
                    <h2 className='guest-names'>{firstName}<br/>{lastName}</h2>
                    <p className='message'>{message}</p>
                    <button onClick={this.onDeleteGuestClick}>
                        Delete
                    </button>
                </div>
        )    
    }
}