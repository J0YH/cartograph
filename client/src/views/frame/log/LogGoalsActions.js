import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import LogGoalsActionsAction from './LogGoalsActionsAction';

export class LogGoalsActions extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		console.log('refreshing LogGoalsActions.js');
		
		if (this.props.goal.actions.length === 0) {
			return(
				<div className='lga-container'>
					<p>No actions yet.</p>
					<p>To add one, please <NavLink strict to='/frame/editor/goals'>edit</NavLink> this goal.</p>
				</div>
			)
		}

		return(
			<div>
				{this.props.goal.actions.map(action => {
					return (<LogGoalsActionsAction refresh={this.props.refresh} action={action} />)
				})}
			</div>
		)
	}
}

export default connect()(LogGoalsActions)