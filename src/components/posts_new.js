import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; // reduxForm is a functin like connect, used to talk to redux store
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error }} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input} // instead of onChange={field.input.onChange} and other event handlers we type this 
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
                
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
        if(Object.keys(values).length > 0){
            this.props.createPost(values, () => {
                this.props.history.push('/');
            });
        }
    }

    render() {
        const { handleSubmit } = this.props; // comes from reduxForm from the bottom

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> 
                <Field // doesnt know how to show itself on the screen, only handles data
                    label="Title for Post"
                    name="title"
                    component={this.renderField} // used to display the field on the screen
                />
                <Field // doesnt know how to show itself on the screen, only handles data
                    label="Categories"
                    name="categories"
                    component={this.renderField} 
                />
                <Field // doesnt know how to show itself on the screen, only handles data
                    label="Post Content"
                    name="content"
                    component={this.renderField} 
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                &nbsp;<Link to="/" className="btn btn-danger" >Cancel</Link>
            </form>
        );
    }
}

function validate(values){ // values by convention
    console.log('validate function = ',values);
    const errors = {};

    if(!values.title) {
        errors.title = "enter a title";
    }
    if(!values.categories) {
        errors.categories = "enter a category";
    }
    if(!values.content) {
        errors.content = "enter some content";
    }
    // if errors obj is empty, form is good to submit, else form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm' // name of the form in case of multiple forms
})(
    connect(null, { createPost })(PostsNew)
);
