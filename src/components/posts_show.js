import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params; // to match the wild card token from the route, the params object has all wild card entries
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;
        if(!post){
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/" className="btn btn-primary">Back</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    
                Delete Post</button> 
                    <h3>{post.title}</h3>
                    <h6>Categories: {post.categories}</h6>
                    <p>{post.content}</p>
            </div>
            
        );
    }
}

function mapStateToProps({ posts }, ownProps) { // props that the conmponent already has
    console.log('data b4 passing to this.props = ',posts);
    return { post: posts[ownProps.match.params.id] }; // this.props === ownProps, here we are selecting a particular post and then sending it to the component
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);