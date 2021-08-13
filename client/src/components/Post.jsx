import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Post extends Component {
    state = {
        title: '',
        description: '',
        originalPoster: '',
        timeStamp: '',
        _id: ''
    }

    componentDidMount() {
        this.refreshPost()
    }

    refreshPost = () => {
        const postId = this.props.match.params.id
        axios.get(`/api/post/${postId}`)
            .then((res) => {
                this.setState(res.data)
            })
    }

    onClickDeletePost = () => {
        const postId = this.props.match.params.id
        axios.delete(`/api/post/${postId}`)
        .then(() => {
            this.refreshPost()
        })
    }
    
    updatePost = () => {
        const postId = this.props.match.params.id
        axios.put(`/api/post/${postId}`, {
            title: this.state.title,
            description: this.state.description,
            originalPoster: this.state.originalPoster,
        })
        .then(() => {
            this.refreshPost()        
        })
    }

    handlePostChange = (event)  => {
        const updatePost = {...this.state}
        updatePost[event.target.name] = event.target.value
        this.setState({
            title: updatePost.title,
            description: updatePost.description,
            originalPoster: updatePost.originalPoster
        })
    }

    handleSubmit = (event) => {
        this.setState({
            title: '',
            description: '',
            originalPoster: ''
        })
    event.preventDefault()
    }

    render() {
        const {title, description, originalPoster, timeStamp, _id} = this.state
        return (
            <div className='single-guest-container'>
                <h2 className='guest-names'>{title}</h2>
                <p className='guest-message'>Desc: {description}</p>
                <p className='guest-message'>OP: {originalPoster}</p>
                <p className='guest-message'>{timeStamp}</p>
                <p className='guest-message'>ID: {_id}</p>
                <form id='update-guest-form' onSubmit={this.handleSubmit}>
                    <input
                        className='input-field'
                        type='string'
                        name='title'
                        placeholder='Change Title'
                        required='required'
                        onChange={this.handlePostChange}
                        value={this.state.title}/>
                    <textarea
                        className='input-field'
                        type='string'
                        name='descrpition'
                        placeholder='Change Desc'
                        required='required'
                        onChange={this.handlePostChange}
                        value={this.state.description}/>
                    <input
                        className='input-field'
                        type='string'
                        name='originalPoster'
                        placeholder='Change OPID'
                        required='required'
                        onChange={this.handlePostChange}
                        value={this.state.originalPoster}/>
                    <button
                        className='button'
                        type='submit'
                        onClick={this.updatePost}>
                        Update
                    </button>
                    <button 
                        className='button'
                        onClick={this.onClickDeletePost}>
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
                        Jotuns
                    </h1>
                </Link>
            </div>
        )
    }
}