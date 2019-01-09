import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './Frame.css';
import arrowLeft from '../../assets/arrow-left.png'
import rightArrow from '../../assets/right-arrow.png'
import compass from '../../assets/compass.png'
import { getUser } from '../../actions/action';

export class Frame extends React.Component {
	constructor() {
		super();

		this.state = {
			expandNav: false,
			showHamburger: false,
		};
	}

	componentDidMount() {
		this.props.dispatch(getUser());
	}

	handleCompassClick(e) {
		e.preventDefault();

		this.setState({
			showHamburger: !this.state.showHamburger,
		});
	}


	handleLinkClick(e) {

		// e.preventDefault();
		this.setState({
			showHamburger: false,
		});
	}

	render() {
		return(
			<div className='f-container'>
				<div className='f-left-nav'>
					<ul>
						<li className='f-edit'>
							<NavLink 
								strict
								to='/frame/editor/goals'
								activeStyle={{ fontWeight: "700", fontStyle: "italic" }}
							>
								edit
							</NavLink>
						</li>
						<li className='f-log'>
							<NavLink
								strict
								to='/frame/log/goals'
								activeStyle={{ fontWeight: "700", fontStyle: "italic" }}
							>
								log
							</NavLink>
						</li>
						<li className='f-track'>
							<NavLink
								strict
								to='/frame/tracker/goals'
								activeStyle={{ fontWeight: "700", fontStyle: "italic" }}

							>
								track
							</NavLink>
						</li>
					</ul>
				</div>
				<div className='f-top-nav'>
					<h1>CARTOGRAPH</h1>
					<button
						className='f-compass'
						onClick={e => this.handleCompassClick(e)}
					>
						<img src={compass} style={{ width: '35px' }}/>
					</button>
					{this.state.showHamburger ?
						<div className='f-hamburger'>
							<ul onMouseLeave={e => {this.handleLinkClick(e)}}>
								<li>
									<Link
										strict
										to='/about'

									>
										ABOUT
									</Link>
								</li>
								<li>
									<Link
										strict
										to='/frame/account'
										onClick={e => {this.handleLinkClick(e)}}
									>
										ACCOUNT
									</Link>
								</li>
								<li>
									<Link
										strict
										to='/logout'
									>
										LOG OUT
									</Link>
								</li>
							</ul>
						</div>
						: null
					}
					
				</div>
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {user: state.account.user}
}

export default connect(mapStateToProps)(Frame)
