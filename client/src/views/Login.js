import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.css';

export class Login extends React.Component {
	constructor() {
		super();

		this.state = {
			username: null,
			password: null,
		};
	}

	handleChange(e, type) {
		const input = e.target.value;

		if (type === 'username') {
			this.setState({
				username: e.target.value,
			});
		}
		if (type === 'password') {
			this.setState({
				password: e.target.value,
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.submitCredentials(this.state.username, this.state.password);
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-area'>
					<h1>SIGN IN</h1>
					<form className='login-form'>
						<input
							className='login-input'
							type='text' 
							onChange={e => this.handleChange(e, 'username')}
							placeholder='username'
						>
						</input>
						<br/>					
						<input
							className='login-input'
							type='password'
							onChange={e => this.handleChange(e, 'password')}
							placeholder='password'
						>
						</input>
						<button onClick={e => this.handleSubmit(e)}>
							SUBMIT
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default connect()(Login)