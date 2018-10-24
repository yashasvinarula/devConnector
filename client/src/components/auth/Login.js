import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: { }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    this.setState({errors: {email: "", password: ""}});
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <input
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  className = {classnames('form-control form-control-lg', {
                    'is-invalid': errors
                  })}
                />
              {errors && (<div className = "invalid-feedback">{errors.email}</div>)}
              <br />
              <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  className = {classnames('form-control form-control-lg', {
                    'is-invalid': errors
                  })}
                />
              {errors && (<div className = "invalid-feedback">{errors.password}</div>)}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
