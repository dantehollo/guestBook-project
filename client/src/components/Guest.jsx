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
            .then(() => {
                this.refreshGuest()
            })
     }
     
    //  update
    updateGuest = () => {
        const guestId = this.props.guestId
        axios.put(`/api/guestBook/${guestId}`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            message: this.state.message
        })
            .then(() => {
                this.refreshGuest()
            })
    }

    onGuestChange = (event) => {
        const updateGuest = {...this.state}
        updateGuest[event.target.name] = event.target.value
        this.setState({firstName: updateGuest.firstName,
                        lastName: updateGuest.lastName,
                        message: updateGuest.message})
    }

    render() {
        const {firstName, lastName, message} = this.state
        return (
                <div>
                    <h2 className='guest-names'>{firstName}<br/>{lastName}</h2>
                    <p className='message'>{message}</p>
                    <form id='update-guest-form'>
                        <input
                            className='input-field'
                            type='string'
                            name='firstName'
                            placeholder='First Name'
                            required='required'
                            onChange={this.onGuestChange}
                            value={this.state.firstName}/>
                        <input
                            className='input-field'
                            type='string'
                            name='lastName'
                            placeholder='Last Name'
                            required='required'
                            onChange={this.onGuestChange}
                            value={this.state.lastName}/>
                        <input
                            className='input-field'
                            type='string'
                            name='message'
                            placeholder='Message'
                            required='required'
                            onChange={this.onGuestChange}
                            value={this.state.message}/>
                    </form>
                    <button
                        onClick={() => this.updateGuest()}>
                        Update
                    </button>
                    <button onClick={this.onDeleteGuestClick}>
                        Delete
                    </button>
                </div>
        )    
    }
}