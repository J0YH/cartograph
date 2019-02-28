import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Tracker.css'

export class TrackerGoalsGoal extends React.Component {

	// componentDidMount() {
	// 	// this.props.goal.actions is undefined on render but exists on componentdidmount - workaround below but ?
	// 	// console.log(this.props.goal.actions);
	// }

	constructor(props) {
		super(props);
		const categoriesArray = this.props.categories;
		const goalCategoryId = this.props.goal.category;
		this.goalCategoryObj = categoriesArray.find(category => category._id === goalCategoryId);
	}

	render() {
		if (this.props.goal.actions.length > 0) {
			return (
				<div className='tgg-goal'>
					<div className='tgg-goal-header'>
						<h3>{this.props.goal.name}</h3>
						<h4>
							{moment(new Date(this.props.goal.dueDate)).format('MMMM Do, YYYY')}
						</h4>
					</div>
					<div className='tgg-goal-details'>
						<p><span className='tgg-goal-bolder'>Category</span>: {this.goalCategoryObj.name}</p>

						<p><span className='tgg-goal-bolder'>Description</span>: {this.props.goal.description}</p>
					</div>
					{this.props.goal.actions.map(action => (
						<ul key={action.id}>
							{action.completedDate ? 
								<div className='tgg-action-completed'>
									<li className='tgg-action-completed-date'>
										COMPLETED {moment(new Date(action.completedDate)).format('MM/DD/YYYY')}
									</li>
									<li className='tgg-action-name'>
										{action.name}
									</li>
									<li className='tgg-action-date'>
										Due: {moment(new Date(action.dueDate)).format('MMMM Do, YYYY')}
									</li>
									
								</div>
								:
								<div className='tgg-action'>
									<li className='tgg-action-name'>
										{action.name}
									</li>
									<li className='tgg-action-date'>
										{moment(new Date(action.dueDate)).format('MMMM Do, YYYY')}
									</li>
								</div>

							}
							<br/>
						</ul>
					))}
				</div>
			)	
		}

		return (
			<div className='tgg-goal'>
				<div className='tgg-goal-header'>
					<h3>{this.props.goal.name}</h3>
					<h4>
						{moment(new Date(this.props.goal.dueDate)).format('MMMM Do, YYYY')}
					</h4>
				</div>
				<div className='tgg-goal-details'>
					<p><span className='tgg-goal-bolder'>Category</span>: {this.goalCategoryObj.name}</p>
					<p><span className='tgg-goal-bolder'>Description</span>: {this.props.goal.description}</p>
				</div>
				<div className='tgg-no-actions'>
					No actions yet.
				</div>
			</div>
		)
	}
}

export default connect()(TrackerGoalsGoal)