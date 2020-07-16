import React, { Component } from 'react'
import axios from 'axios'

export default class Guest extends Component {
    state = {
        firstName: '',
        lastName: '',
        message: '',
    }

    componentDidMount() {
        this.refreshGuest()
    }
    
    refreshGuest = () => {
        const guestId = this.props.match.params.id
        axios.get(`/api/guestBook/${guestId}`)
            .then((res) => {
                this.setState(res.data)
            })
    }

    // delete
     onDeleteGuestClick = () => {
        const guestId = this.props.match.params.id
        axios.delete(`/api/guestBook/${guestId}`)
            .then(() => {
                this.refreshGuest()
            })
     }
     
    //  update
    updateGuest = () => {
        const guestId = this.props.match.params.id
        axios.put(`/api/guestBook/${guestId}`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            message: this.state.message
        })
            .then(() => {
                this.refreshGuest()
            })
    }

    handleGuestChange = (event) => {
        const updateGuest = {...this.state}
        updateGuest[event.target.name] = event.target.value
        this.setState({firstName: updateGuest.firstName,
                        lastName: updateGuest.lastName,
                        message: updateGuest.message})
    }
    
    handleSubmit = (event) => {
        this.setState({firstName: '',
                        lastName: '',
                        message: ''})
        event.preventDefault()
    } 

    render() {
        const {firstName, lastName, message} = this.state
        return (
                <div className='single-guest-container'>
                    <h2 className='guest-names'>{firstName}<br/>{lastName}</h2>
                    <p className='guest-message'>{message}</p>
                    <form id='update-guest-form' onSubmit={this.handleSubmit}>
                        <input
                            className='input-field'
                            type='string'
                            name='firstName'
                            placeholder='First Name'
                            required='required'
                            onChange={this.handleGuestChange}
                            value={this.state.firstName}/>
                        <input
                            className='input-field'
                            type='string'
                            name='lastName'
                            placeholder='Last Name'
                            required='required'
                            onChange={this.handleGuestChange}
                            value={this.state.lastName}/>
                        <input
                            className='input-field'
                            type='string'
                            name='message'
                            placeholder='Message'
                            required='required'
                            onChange={this.handleGuestChange}
                            value={this.state.message}/>
                        <button
                            className='button'
                            type='submit'
                            onClick={this.updateGuest}>
                            Update
                        </button>
                        <button 
                            className='button'
                            onClick={this.onDeleteGuestClick}>
                            Delete
                        </button>
                    </form>
                </div>
        )    
    }
}