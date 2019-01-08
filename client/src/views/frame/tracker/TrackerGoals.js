import React from 'react';
import { connect } from 'react-redux';
import TrackerGoalsGoal from './TrackerGoalsGoal';

export class TrackerGoals extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		console.log(this.props.goals);

		return(
			<div>
				{this.props.goals.map(goal => (
					<TrackerGoalsGoal goal={goal} categories={this.props.categories}/>
				))}
			</div>)
	}

}

export default connect()(TrackerGoals)