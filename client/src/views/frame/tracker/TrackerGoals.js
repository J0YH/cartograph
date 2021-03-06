import React from 'react';
import { connect } from 'react-redux';
import TrackerGoalsGoal from './TrackerGoalsGoal';

export class TrackerGoals extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				{this.props.goals.map(goal => (
					<TrackerGoalsGoal key={goal.id} goal={goal} categories={this.props.categories}/>
				))}
			</div>)
	}

}

export default connect()(TrackerGoals)