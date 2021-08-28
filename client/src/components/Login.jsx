import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    state = {
        loggedIn: 'guest',
        userdata: {
            userName: '',
            passWord: ''
        }
    }

    // componentDidMount() {
    //     this.refreshHeader()
    // }

    // refreshHeader() {
    //     axios.get
    // }

    onInputChange = (event) => {
        const newUser = {...this.state.enteredUser}
        newUser[event.target.name] = event.target.value
        this.setState(newUser)
    }

    handleSubmit = (event) => {
        this.setState({
            userName: '',
            passWord: ''
        })
    }

    attemptLogin() {
        const enteredUser = {
            userName: this.state.userData.userName,
            passWord: this.state.userData.passWord
        }

        axios.post('api/user/login', enteredUser)
        .then((response)=> {
            console.log(`The response is: ${response.send}`)
        })
    }

    render() {
        return(
            <header>
                <form id='login-form' onSubmit={this.handleSubmit}>
                    <input
                        className='input-field'
                        type='string'
                        name='userName'
                        placeholder='username'
                        required='required'
                        onChange={this.onInputChange}
                        value={this.state.userName}/>
                    <input
                        className='input-field'
                        type='password'
                        name='passWord'
                        placeholder='password'
                        required='required'
                        onChange={this.onInputChange}
                        value={this.state.passWord}/>
                </form>
                <button
                    className='button'
                    onClick={() => this.attemptLogin()}
                    >
                        Submit
                </button>
            </header>
        )
    }
}