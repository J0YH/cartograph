import React from 'react';
import { connect } from 'react-redux';
import { completeAction } from '../../../actions/action';
import moment from 'moment';

export class LogGoalsActionsAction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			refreshAction: false,
		};
	};

	handleDone(e, id) {
		this.props.dispatch(completeAction(id));
		this.props.refresh();
		// need to trigger refresh of state ONLY if server response is 200 - how to check res status? 
		this.setState({
			refreshAction: !this.state.refreshAction,
		});
	};

	render() {

		if (this.props.action.completedDate || this.state.refreshAction === true) {
			return(
				<div className='lgaa-container'>
					<div className='lgaa-left-complete'>
						<div className='lgaa-x'>X</div>
					</div>
					<div className='lgaa-right'>
						<p>{this.props.action.name}</p>
						<p className='lgaa-bolder'>Completed</p>
					</div>
				</div>
			)
		}

		if (!this.props.action.completedDate) {
			return (
				<div className='lgaa-container'>
					<div className='lgaa-left'>
						<button
							title='Click to mark complete'
							onClick={e => this.handleDone(e, this.props.action._id)}
						>
							
						</button>
					</div>
					<div className='lgaa-right'>
					 	<p>{this.props.action.name}</p>
					 	<p> <span className='lgaa-bolder'>Due: </span>{moment(new Date(this.props.action.dueDate)).format('MMMM Do, YYYY')}</p>

					 	
					 </div>
				</div>
			)
		}

	}
}

export default connect()(LogGoalsActionsAction)