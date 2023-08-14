// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const comments = [
    { username: 'alice', content: 'first comment!' },
    { username: 'bob', content: 'hello world!' },
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/comments', (req, res) => {
    res.send(comments);
});
app.post('/api/comments', (req, res) => {
    const { username, content } = req.body;
    comments.push({ username, content });
    res.send(comments);
});
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// Path: index.js
// Create React App
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommentApp from './CommentApp';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<CommentApp />, document.getElementById('root'));
registerServiceWorker();

// Path: CommentApp.js
// Create React App
import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
        };
    }
    handleSubmitComment(comment) {
        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments,
        });
    }
    render() {
        return (
            <div className="wrapper">
                <CommentInput
                    onSubmit={this.handleSubmitComment.bind(this)}
                />
                <CommentList comments={this.state.comments} />
            </div>
        );
    }
}
export default CommentApp;

// Path: CommentInput.js
// Create React App
import React, { Component } from 'react';
class CommentInput extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            content: '',
        };
    }
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
        });
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value,
        });
    }
    handleSubmit() {
        if (this.props.onSubmit) {
            const { username, content } = this.state;
            this.props.onSubmit({ username, content });
        }
        this.setState({ content: ''