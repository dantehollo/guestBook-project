import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class User extends Component {
    state = {
        userName: '',
        passWord: '',
    }

    componentDidMount() {
        this.refreshUser()
    }
    
    refreshUser = () => {
        const userId = this.props.match.params.id
        axios.get(`/api/user/${userId}`)
            .then((res) => {
                this.setState(res.data)
            })
    }

    // delete
     onClickDeleteUser = () => {
        const userId = this.props.match.params.id
        axios.delete(`/api/user/${userId}`)
            .then(() => {
                this.refreshUser()
            })
     }
     
    //  update
    updateUser = () => {
        const userId = this.props.match.params.id
        axios.put(`/api/user/${userId}`, {
            userName: this.state.userName,
            passWord: this.state.passWord,
        })
            .then(() => {
                this.refreshUser()
            })
    }

    handleUserChange = (event) => {
        const updateUser = {...this.state}
        updateUser[event.target.name] = event.target.value
        this.setState({
            userName: updateUser.userName,
            passWord: updateUser.passWord
        })
    }
    
    handleSubmit = (event) => {
        this.setState({
            userName: '',
            passWord: ''
        })
        event.preventDefault()
    } 

    render() {
        const {userName, passWord} = this.state
        return (
                <div className='single-guest-container'>
                    <h2 className='guest-names'>{userName}</h2>
                    <p className='guest-message'>{passWord}</p>
                    <form id='update-guest-form' onSubmit={this.handleSubmit}>
                        <input
                            className='input-field'
                            type='string'
                            name='userName'
                            placeholder='Change User Name'
                            required='required'
                            onChange={this.handleUserChange}
                            value={this.state.userName}/>
                        <input
                            className='input-field'
                            type='password'
                            name='passWord'
                            placeholder='Change Password'
                            required='required'
                            onChange={this.handleUserChange}
                            value={this.state.passWord}/>
                        <button
                            className='button'
                            type='submit'
                            onClick={this.updateUser}>
                            Update
                        </button>
                        <button 
                            className='button'
                            onClick={this.onClickDeleteUser}>
                            Delete
                        </button>
                    </form>
                    <Link to={`/user`}>
                        <h1>
                            Users
                        </h1>
                    </Link>
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
                </div>
        )    
    }
}