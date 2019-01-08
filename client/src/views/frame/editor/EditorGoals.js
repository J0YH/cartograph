import React from 'react';
import { connect } from 'react-redux';
import EditorGoalsForm from './EditorGoalsForm';

export class GoalEditor extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			showForm: false,
			formType: null,
			goalId: null,
			landing: true,
		};
	};

	changeOptions(e) {
		const selectedGoalId = e.target.value;

		this.setState({
			showForm: true,
			landing: false,
			formType: 'edit',
			goalId: selectedGoalId,
		});
	};

	clickHandler(e) {
		this.setState({
			showForm: true,
			landing: false,
			formType: 'create',
		});
	}

	render() {
		let selectedGoal;
		
		selectedGoal = this.props.goals.filter(goal => {
			return goal._id === this.state.goalId;
		});
		
		return(
			<div className='eg-container'>

				{this.state.landing ?
					<div className='eg-landing-container'>
						<div className='eg-select-container'>
							<select className='eg-select' onChange={e => this.changeOptions(e)}>
								<option value="" selected disabled>Choose goal to edit</option>
								{this.props.goals.map(goal => {
									return <option key={goal._id} value={goal._id}>{goal.name}</option>
								})}
							</select>
						</div>

						<div className='eg-add-goal'>
							<button onClick={e => this.clickHandler(e)}>
								OR <br/>
								CLICK TO ADD GOAL
								<p>
									+
								</p>
							</button>
						</div>
					</div>
					: 
					null
				}

				{this.state.formType === 'edit' ? 
					<EditorGoalsForm
						categories={this.props.categories}
						goal={selectedGoal[0]}
						sendGoalEdits={this.props.sendGoalEdits}
						sendActionEdits={this.props.sendActionEdits}
						sendActionAdd={this.props.sendActionAdd}
						sendActionDelete={this.props.sendActionDelete}
						formType={this.state.formType} />
					: null
				}

				{this.state.formType === 'create' ?
					<EditorGoalsForm
						categories={this.props.categories}
						sendGoalCreate={this.props.sendGoalCreate}
						formType={this.state.formType} />
					: null
				}				
				
			</div>
		)
	}
}

export default connect()(GoalEditor)