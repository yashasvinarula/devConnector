import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction'
import {withRouter} from 'react-router-dom';

class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors.errors})
    }
  }

  onChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event){
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render(){

    const {errors} = this.state;

    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <input
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  className = {classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                />
              {errors.name && (<div className = "invalid-feedback">{errors.name}</div>)}
              <br />
              <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  className = {classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
              {errors.email && (<div className = "invalid-feedback">{errors.email}</div>)}
              <br />
              <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  className = {classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
                />
              {errors.password && (<div className = "invalid-feedback">{errors.password}</div>)}
              <br />
              <input
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  className = {classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2
                  })}
                />
              {errors.password2 && (<div className = "invalid-feedback">{errors.password2}</div>)}
              <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
