import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CommentView extends Component {
    state = {
        commentList: [],
        newComment: {
            newCommentText: '',
            newUserName: '',
            newTimeStamp: '',
            newPostId: ''
        }
    }

    componentDidMount() {
        this.refreshComment()
    }

    refreshComment() {
        axios.get('api/comment')
        .then((response) => {
            this.setState({commentList : response.data})
        })
    }

    createNewComment() {
        const newComment = {
            commentText: this.state.newComment.newCommentText,
            userName: this.state.newComment.newUserName,
            postId: this.state.newComment.newPostId

        }

        axios.post('api/comment', newComment)
        .then(() => {
            this.refreshComment()
        })
    }

    onNewCommentChange = (event) => {
        const newComment = {...this.state.newComment}
        newComment[event.target.name] = event.target.value
        this.setState({newComment: newComment})
    }

    handleSubmit = (event) => {
        this.setState({newComment: {
            newCommentText: '',
            newUserName: '',
            newTimeStamp: '',
            newPostId: ''
        }})
        event.preventDefault()
    }

    clearForm() {
        const commentForm = document.getElementById('test-form')
        commentForm.reset()
    }

    render() {
        const allComments = this.state.commentList.map((comment) => {
            return <section className="entry" key={comment._id}>
                <div className="name-box">  
                    <Link to={`/comment/${comment._id}`}>
                        <h2 className='name'>Associated User: {comment.userName}</h2>
                    </Link>
                </div>
                <div className="message">
                    <p>Comment Text: {comment.commentText}</p>
                    <p>Associated Post: {comment.postId}</p>
                    <p>Comment ID: {comment._id}</p>
                    <p>{comment.timeStamp}</p>
                </div>
            </section>
        })

        return (
            <div className='guest-container'>
                <section className="hero">
                    <h1 className="welcome">
                        Welcome to the <br/> <span className="title">Scrawls on the Wall</span>
                    </h1>
                    <p className="tagline">Hey there! Thanks for stopping by. Feel free to scroll through 
                        the other messages and leave a note below.
                    </p>
                    <div className='create-new-guest-form'>
                        <form id='new-guest-form' onSubmit={this.handleSubmit}>
                            <textarea
                                className='input-field'
                                type='string'
                                name='newCommentText'
                                placeholder="What's your opinion?"
                                required='required'
                                onChange={this.onNewCommentChange}
                                value={this.state.newComment.newCommentText}/>
                            <input
                                className='input-field'
                                type='string'
                                name='newUserName'
                                placeholder='Who wrote this'
                                required='required'
                                onChange={this.onNewCommentChange}
                                value={this.state.newComment.newUserName}/>
                            <input
                                className='input-field'
                                type='string'
                                name='newPostId'
                                placeholder='Associated post'
                                required='required'
                                onChange={this.onNewCommentChange}
                                value={this.state.newComment.newPostId}/>
                            <button
                                className='button'
                                onClick={() => this.createNewComment()}>
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
                <Link to={`/user`}>
                    <h1>
                        Users
                    </h1>
                </Link>
                <div>
                    { allComments }
                </div>
            </div>
        )
    }
}