import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class UserView extends Component {
    state = {
        userList: [],
        newUser: {
            newUserName: '',
            newUserPassword: ''
        }
    }

    componentDidMount() {
        this.refreshUserList()
    }

    refreshUserList = () => {
        axios.get('api/user')
        .then((response) => {
            this.setState({userList: response.data})
        })
    }

    createNewUser = () => {
        const newUser = {
            userName: this.state.newUser.newUserName,
            passWord: this.state.newUser.newUserPassword,
        }
        
        axios.post('api/user', newUser)
            .then(()=> {
                this.refreshUserList()
            })
        
    }

    onNewUserChange = (event) => {
        const newUser = {...this.state.newUser}
        newUser[event.target.name] = event.target.value
        this.setState({newUser: newUser})
    }

    handleSubmit = (event) => {
        this.setState({newUser: {
                            newUserName: '',
                            newUserPassword: '',
                    }
                }
            )
        event.preventDefault()
    } 

    clearForm = () => {
        const userForm = document.getElementById('test-form')
        console.log(userForm)
        userForm.reset()
    }

    render() {
        const allUsers = this.state.userList.map((user) => {
            return <section className="entry" key={user._id}>
                        <div className="name-box">  
                            <Link to={`/user/${user._id}`}>
                                <h2 className='name'>{user.userName}</h2>
                            </Link>
                        </div>
                        <div className="message">
                            <p>{user.passWord}</p>
                            <p>{user._id}</p>
                        </div>
                    </section>
        })
        return (
            <div className='guest-container'>
                <section className="hero">
                    <h1 className="welcome">
                        Welcome to the <br/> <span className="title">SCRAWLS ON THE WALLS</span>
                    </h1>
                    <p className="tagline">Hey there! Thanks for stopping by. Feel free to scroll through 
                        the other messages and leave a note below.
                    </p>
                    <div className='create-new-guest-form'>
                        <form id='new-guest-form' onSubmit={this.handleSubmit}>
                            <input
                                className='input-field'
                                type='string'
                                name='newUserName'
                                placeholder='username'
                                required='required'
                                onChange={this.onNewUserChange}
                                value={this.state.newUser.newUserName}/>
                            <input
                                className='input-field'
                                type='password'
                                name='newUserPassword'
                                placeholder='password'
                                required='required'
                                onChange={this.onNewUserChange}
                                value={this.state.newUser.newUserPassword}/>
                            <button
                                className='button'
                                onClick={() => this.createNewUser()}>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>   
                <Link to={`/`}>
                    <h1>
                        Posts
                    </h1>
                </Link>
                <Link to={`/comment`}>
                    <h1>
                        Comments
                    </h1>
                </Link>
                <div>
                    { allUsers }
                </div>
            </div>
        )
    }
}