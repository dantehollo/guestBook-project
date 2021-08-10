import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class PostView extends Component {
    state = {
        postList: [],
        newPost: {
            newPostTitle: '',
            newPostDescription: '',
            newPostOP: ''
            // newPostTimeStamp: ''
        }
    }

    componentDidMount() {
        this.refreshPostList()
    }

    refreshPostList = () => {
        axios.get('api/post')
        .then((response) => {
            this.setState({postList: response.data})
            console.log(response.data)
        })
    }

    createNewPost = () => {
        const newPost = {
            title: this.state.newPost.newPostTitle,
            description: this.state.newPost.newPostDescription,
            originalPoster: this.state.newPost.newPostOP,
            // timeStamp: this.state.newPost.newPostTimeStamp
        }

        axios.post('api/post', newPost)
        .then(() => {
            this.refreshPostList()
        })
    }

    onNewPostChange = (event) => {
        const newPost = {...this.state.newPost}
        newPost[event.target.name] = event.target.value
        this.setState({newPost: newPost})
    }

    handleSubmit = (event) => {
        this.setState({newPost: {
            newPostTitle: '',
            newPostDescription: '',
            newPostOP: '',
            // newPostTimeStamp: ''
        }})
        event.preventDefault()
    }

    clearForm = () =>  {
        const postForm = document.getElementById('test-form')
        postForm.reset()
    }

    render() {
        const allPosts = this.state.postList.map((post) => {
            return <section className='entry' key={post._id}>
                        <div className='name-box'>
                            <Link to={`/${post._id}`}>
                                <h2 className='name'>{post.originalPoster}</h2>
                            </Link>
                        </div>
                        <div className='message'>
                            <p>{post.title}</p>
                            <p>{post.description}</p>
                            <p>{post.timestamp}</p>
                        </div>
                    </section>
        })

        return (
            <div className='guest-container'>
                <section className="hero">
                    <h1 className="welcome">
                        Welcome to the <br/> <span className="title">TAGZ</span>
                    </h1>
                    <p className="tagline">Hey there! Thanks for stopping by. Feel free to scroll through 
                        the other messages and leave a note below.
                    </p>
                </section>
                <div className='create=new-guest-form'>
                    <form id='new=guest-form' onSubmit={this.handleSubmit}>
                        <input
                            className='input-field'
                            type='string'
                            name='newPostTitle'
                            placeholder='Your thought here'
                            required='required'
                            onChange={this.onNewPostChange}
                            value={this.state.newPost.newPostTitle}/>
                        <textarea
                            className='input-field'
                            type='string'
                            name='newPostDescription'
                            placeholder='Your thought here'
                            required='required'
                            onChange={this.onNewPostChange}
                            value={this.state.newPost.newPostDescription}/>
                        <input
                            className='input-field'
                            type='string'
                            name='newPostOP'
                            placeholder='Your thought here'
                            required='required'
                            onChange={this.onNewPostChange}
                            value={this.state.newPost.newPostOP}/>
                        <button
                            className='button'
                            onClick={() => this.createNewUser()}>
                            Submit
                        </button>
                    </form>
                    <Link to={`/user`}>
                        <h1>
                            Users
                        </h1>
                    </Link>
                    <Link to={`/comment`}>
                        <h1>
                            Comments
                        </h1>
                    </Link>
                </div>
                <div>
                    { allPosts }
                </div>
            </div>
        )
    }
}