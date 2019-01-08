import React from 'react';
import { connect } from 'react-redux';
import LogGoalsActions from './LogGoalsActions'
import downArrowBlack from '../../../assets/down-arrow-black.png'

export class GoalLog extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			goal: null,
			showActions: false
		};
	};

	changeHandler(e) {
		const selectedGoal = this.props.goals.find(goal => {
			return goal._id === e.target.value
		});

		this.setState({
			goal: selectedGoal,
			showActions: true
		});
	};

	render() {
		return(
			<div className='lg-container'>
				<div className='lg-select-container'>
					<select className='lg-select' onChange={e => this.changeHandler(e)}>
						<option value="" selected disabled>Choose goal to log actions</option>
						{this.props.goals.map(goal => {
							return <option value={goal._id}>{goal.name}</option>
						})}
					</select>
				</div>
				<div className='lg-actions-container'>
					{this.state.showActions ?
						<div>
							<div className='lg-instructions'>
								Click the checkbox to mark an action complete.
							</div>
							<LogGoalsActions goal={this.state.goal} refresh={this.props.refresh} />
						</div>
						: null
					}
				</div>
			
			</div>)
	}
}

export default connect()(GoalLog);