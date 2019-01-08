import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';
import downArrow from '../assets/down-arrow.png';
import upArrow from '../assets/up-arrow.png';
import { Login } from './Login';
import { login } from '../actions/action';
import { Redirect } from 'react-router-dom';

export class Home extends React.Component {

	constructor() {
		super();

		this.state = {
			showLogin: false,
		};

		this.submitCredentials = this.submitCredentials.bind(this);
	}

	handleDownClick(e) {
		e.preventDefault();
		this.setState({
			showLogin: true,
		});
	}

	handleUpClick(e) {
		e.preventDefault();
		this.setState({
			showLogin: false,
		});
	}

	submitCredentials(username, password) {
		this.props.dispatch(login(username, password));
	}

	render() {

		if (!this.props.token) {
			return(
				<div>
					<div className='h-banner'>
						<p>CARTOGRAPH</p>
							{/*<img
								src={downArrow}
								style={{ width: '80px' }}
							/>*/}
					</div>
					<div className='h-parallax'>
						<div className='h-signin'>
							<Login submitCredentials={this.submitCredentials} />
						</div>
					</div>
				</div>
				
			)
		}

		if (this.props.token) {
			return(
				<Redirect to="/frame/tracker/goals" />
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.account.token
	}
};

export default connect(mapStateToProps)(Home)