import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Comment extends Component {
    state = {
        commentText: '',
        userName: '',
        timeStamp: '',
        postId: '',
    }

    componentDidMount() {
        this.refreshComment()
    }

    refreshComment() {
        const commentId = this.props.match.params.id
        axios.get(`/api/comment/:${commentId}`)
        .then((res) => {
            this.setState(res.data)
        })
    }

    onClickDeleteComment() {
        const commentId = this.props.match.params.id
        axios.delete(`/api/comment/:${commentId}`)
        .then(() => {
            this.refreshComment()
        })
    }

    updateComment() {
        const commentId = this.props.match.params.id
        axios.put(`/api/comment/${commentId}`, {
            commentText: this.state.commentText,
            userName: this.state.userName,
            postId: this.state.postId,
        })
        .then(() => {
            this.refreshComment()
        })
    }

    handleCommentChange = (event) => {
        const updateComment = {...this.state}
        updateComment[event.target.name] = event.target.value
        this.setState({
            commentText: updateComment.commentText,
            userName: updateComment.userName,
            postId: updateComment.postId
        })
    }

    handleSubmit = (event) => {
        this.setState({
            commentText: '',
            userName: '',
            timeStamp: '',
            postId: ''
        })
        event.preventDefault()
    }

    render() {
        const {commentText, userName, postId, timeStamp} = this.state
        return (
            <div className='single-guest-container'>
                    <h2 className='guest-names'>{userName}</h2>
                    <p className='guest-message'>{commentText}</p>
                    <p className='guest-message'>{postId}</p>
                    <p className='guest-message'>{timeStamp}</p>
                    <form id='update-guest-form' onSubmit={this.handleSubmit}>
                        <input
                            className='input-field'
                            type='string'
                            name='userName'
                            placeholder='Change User Name'
                            required='required'
                            onChange={this.handleCommentChange}
                            value={this.state.userName}/>
                        <input
                            className='input-field'
                            type='string'
                            name='commentText'
                            placeholder='Change Password'
                            required='required'
                            onChange={this.handleCommentChange}
                            value={this.state.commentText}/>
                        <input
                            className='input-field'
                            type='string'
                            name='postId'
                            placeholder='Change Password'
                            required='required'
                            onChange={this.handleCommentChange}
                            value={this.state.postId}/>
                        <button
                            className='button'
                            type='submit'
                            onClick={this.updateComment}>
                            Update
                        </button>
                        <button 
                            className='button'
                            onClick={this.onClickDeleteComment}>
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
                </div>
        )
    }
}