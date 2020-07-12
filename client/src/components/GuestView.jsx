import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import Guest from './Guest'

export default class GuestView extends Component {
    state = {
        guestList: [],
        newGuest: {
            newGuestFirstName: '',
            newGuestLastName: '',
            newGuestMessage: '',
        }
    }

    componentDidMount() {
        this.refreshGuestList()
    }

    refreshGuestList = () => {
        axios.get('api/guestBook')
        .then((response) => {
            // console.log(response)
            this.setState({guestList: response.data})
        })
    }

    createNewGuest = () => {
        const newGuest = {
            firstName: this.state.newGuest.newGuestFirstName,
            lastName: this.state.newGuest.newGuestLastName,
            message: this.state.newGuest.newGuestMessage
        }
        
        axios.post('api/guestBook', newGuest)
            .then(()=> {
                this.refreshGuestList()
            })
        
    }

    onNewGuestChange = (event) => {
        const newGuest = {...this.state.newGuest}
        newGuest[event.target.name] = event.target.value
        this.setState({newGuest: newGuest})
    }

    handleSubmit = (event) => {
        // console.log("handleSubmit fired")
        this.setState({newGuest: {
                            newGuestFirstName: '',
                            newGuestLastName: '',
                            newGuestMessage: ''}
                    }
                )
        event.preventDefault()
    } 

    clearForm = () => {
        const guestForm = document.getElementById('test-form')
        console.log(guestForm)
        guestForm.reset()
    }

    render() {
        const guestComponent = this.state.guestList.map((guest) => {
            return <section className="entry" key={guest._id}>
                        <div className="name">  
                            <Link to={`/guestBook/${guest._id}`}>
                                <h2>{guest.firstName}</h2>
                                <h2>{guest.lastName}</h2>
                            </Link>
                        </div>
                        <div className="message">  
                            <p>{guest.message}</p>
                        </div>
                    </section>
        })
        return (
            <div className='guest-container'>
                <div className="hero">
                    <h1 className="welcome">
                        Welcome to the <br/> <span className="title">GuestBook</span>
                    </h1>
                    <p className="welcome-message">Leave a message, or scroll down to see who else is here</p>
                </div>
                <div className='create-new-guest-form'>
                    <form id='new-guest-form' onSubmit={this.handleSubmit}>
                        <input
                            className='input-field'
                            type='string'
                            name='newGuestFirstName'
                            placeholder='First Name'
                            required='required'
                            onChange={this.onNewGuestChange}
                            value={this.state.newGuest.newGuestFirstName}/>
                        <input
                            className='input-field'
                            type='string'
                            name='newGuestLastName'
                            placeholder='Last Name'
                            required='required'
                            onChange={this.onNewGuestChange}
                            value={this.state.newGuest.newGuestLastName}/>
                        <textarea
                            className='input-field'
                            type='string'
                            name='newGuestMessage'
                            placeholder='Message'
                            required='required'
                            onChange={this.onNewGuestChange}
                            value={this.state.newGuest.newGuestMessage}/>
                        <button
                            onClick={() => this.createNewGuest()}>
                            Enter
                        </button>
                    </form>
                </div>
                <div>
                    { guestComponent }
                </div>
            </div>
        )
    }
}