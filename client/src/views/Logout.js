import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Logout.css';

export class Logout extends React.Component {

	componentDidMount() {
		//this.props.dispatch logout action here
	}

	render() {
		return(
			<div className='logout-background'>
				<div className='logout-logo'>
					CARTOGRAPH
				</div>
				<div className='logout-content'>
					<p>Logout successful.</p>
					<p>To log back in, click <Link strict to='/'> here.</Link></p>
				</div>
			</div>)
	}

}

export default connect()(Logout)