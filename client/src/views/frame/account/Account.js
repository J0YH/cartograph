import React from 'react';
import { connect } from 'react-redux';
import './Account.css'
import { getUser, editUser, getIndustries } from '../../../actions/action';

export class Account extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: null,
			lastName: null,
			username: null,
			password: null,
			industry: null,
			experience: null,
			about: null,
			country: null,
			state: null,
			city: null,
		};	
	}

	componentDidMount() {
		this.props.dispatch(getUser());
		this.props.dispatch(getIndustries());
	}


	handleSave(e) {
		e.preventDefault(e);
		
		let reqObj = {};

		if (this.state.firstName && !this.state.lastName) {
			reqObj = {
				'name': {
					'lastName': this.props.user.name.lastName
				},
			};
			reqObj.name.firstName = this.state.firstName;
		};

		if (this.state.lastName && !this.state.firstName) {
			reqObj = {
				'name': {
					'firstName': this.props.user.name.firstName
				},
			};
			reqObj.name.lastName = this.state.lastName;
		};

		if (this.state.lastName && this.state.firstName) {
			reqObj = {
				'name': {},
			};
			reqObj.name.lastName = this.state.lastName;
			reqObj.name.firstName = this.state.firstName;
		};

		if (this.state.username) {
			reqObj.username = this.state.username;
		};
		if (this.state.password) {
			reqObj.password = this.state.password;
		};
		if (this.state.industry) {
			reqObj.industry = this.state.industry;
		};
		if (this.state.experience) {
			reqObj.experience = this.state.experience;
		};
		if (this.state.country) {
			reqObj.country = this.state.country;
		};
		if (this.state.about) {
			reqObj.about = this.state.about;
		};

		// need to add location with similar logic as name (location also nested obj)
		// console.log("REQUEST OBJ is", reqObj);
		this.props.dispatch(editUser(reqObj));

	}

	render() {

		if (!this.props.user) {
			return(<p>Loading...</p>)
		}

		return(
			<div className='pad'>
				<div className='a-title'>ACCOUNT</div>
		
				<form className='a-form-container'>
					<div className='a-form-row'>
						<div className='a-label'>
							<label for='firstName'>
								First Name
							</label>
						</div>
						<input
							className='a-input'
							type='text'
							defaultValue={this.props.user ? this.props.user.name.firstName : null}
							onChange={e => this.setState({firstName: e.target.value})}
						>
						</input>
					</div>
					<div className='a-form-row'>
						<div className='a-label'>
							<label for='lastName'>Last Name</label>
						</div>
						<input
							type='text'
							className='a-input'
							defaultValue={this.props.user ? this.props.user.name.lastName : null}
							onChange={e => this.setState({lastName: e.target.value})}
						>
						</input>
					</div>
					<div className='a-form-row'>
						<div className='a-label'>
							<label for='username'>Username</label>
						</div>
						<input
							type='text'
							className='a-input'
							defaultValue={this.props.user ? this.props.user.username : null}
							onChange={e => this.setState({username: e.target.value})}
						>
						</input>
					</div>

					<div className='a-form-row'>
						<div className='a-label'>
							<label>Industry</label>
						</div>
						{this.props.user && this.props.industries ? 
							<select
								className='a-select'
								onChange={e => this.setState({industry: e.target.value})}
								defaultValue={this.props.user.industry}
							>
								{this.props.industries.map(ind => {
										return <option key={ind._id} value={ind._id}>{ind.name}</option>
									})
								}
							</select>

							: <div>Error loading industries</div>
						}
					</div>

					<div className='a-form-row'>
						<div className='a-label'>
							<label for='experience'>Experience (years)</label>
						</div>
						<input
							type='number'
							className='a-input'
							defaultValue={this.props.user ? this.props.user.experience : null}
							onChange={e => this.setState({experience: e.target.value})}
						>
						</input>	
					</div>


					<div className='a-form-row'>
						<div className='a-label'>
							<label for='about'>About</label>
						</div>
						<textarea
							className='a-input'
							type='text'
							defaultValue={this.props.user ? this.props.user.about : null}
							onChange={e => this.setState({about: e.target.value})}
						>
						</textarea>
					</div>

					{/*<div>
						<label for='password'>Password</label>
						<input
							type='text'
							onChange={e => this.setState({password: e.target.value})}
						>
						</input>
					</div>

					<div>
						<label for='country'>Country</label>
						<input
							type='text'
							defaultValue={this.props.user ? this.props.user.country : null}
							onChange={e => this.setState({password: e.target.value})}
						>
						</input>
					</div>
					*/}
					<div className='a-save'>
						<button onClick={e => this.handleSave(e)}>SAVE</button>
					</div>
				</form>
			
			</div>)
	}

}

// below is draft for accessing user object once login complete (currently ALL users)
const mapStateToProps = (state) => {
	return {
		user: state.account.user,
		industries: state.app.industries
	}
};

export default connect(mapStateToProps)(Account)



