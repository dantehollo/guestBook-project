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
            console.log(response)
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

    clearForm = () => {
        const guestForm = document.getElementById('test-form')
        console.log(guestForm)
        guestForm.reset()
    }

    render() {
        const guestComponent = this.state.guestList.map((guest) => {
            return <Link to={`/guestBook/${guest._id}`} key={guest._id}>  
                        <div>
                            <h2>{guest.firstName}</h2>
                            <h2>{guest.lastName}</h2>
                            <p>{guest.message}</p>
                        </div>
                    </Link>
        })
        return (
            <div className='guest-container'>
                <form id='new-guest-form'>
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
                    <input
                        className='input-field'
                        type='string'
                        name='newGuestMessage'
                        placeholder='Message'
                        required='required'
                        onChange={this.onNewGuestChange}
                        value={this.state.newGuest.newGuestMessage}/>
                </form>
                <button
                    onClick={() => this.createNewGuest()}>
                    Enter
                </button>
                <form id='test-form'>
                    <input
                        type='text'
                        name='test'/>
                </form>
                <button
                    onClick={() => this.clearForm()}>
                    Clear Form
                </button>
                <div>
                    { guestComponent }
                </div>
            </div>
        )
    }
}