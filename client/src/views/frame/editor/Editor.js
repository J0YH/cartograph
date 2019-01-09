import React from 'react';
import { connect } from 'react-redux';
import EditorStrategies from './EditorStrategies';
import EditorAccomplishments from './EditorAccomplishments';
import EditorGoals from './EditorGoals';
import './Editor.css';
import {
	getGoals, editGoal, addGoal,
	editAction, addAction, deleteAction,
	getStrategies, getAllStrategies, addStrategy, deleteStrategy,
	getAccomplishments, editAccomplishment, addAccomplishment, deleteAccomplishment,
	getCategories,
} from '../../../actions/action';

export class Editor extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.match.params.tab ? this.props.match.params.tab : 'goals'
		};

		this.sendGoalEdits = this.sendGoalEdits.bind(this);
		this.sendGoalCreate = this.sendGoalCreate.bind(this);
		this.sendActionEdits = this.sendActionEdits.bind(this);
		this.sendStrategyAdd = this.sendStrategyAdd.bind(this);
		this.sendStrategyDelete = this.sendStrategyDelete.bind(this);
		this.sendAccomplishmentEdits = this.sendAccomplishmentEdits.bind(this);
		this.sendAccomplishmentAdd = this.sendAccomplishmentAdd.bind(this);
		this.sendAccomplishmentDelete = this.sendAccomplishmentDelete.bind(this);
		this.sendActionAdd = this.sendActionAdd.bind(this);
		this.sendActionDelete = this.sendActionDelete.bind(this);
	};

	sendAccomplishmentAdd(reqObj) {
		this.props.dispatch(addAccomplishment(reqObj));
	}

	sendAccomplishmentEdits(id, reqObj) {
		
		this.props.dispatch(editAccomplishment(id, reqObj));
	}

	sendStrategyAdd(reqObj) {
		
		this.props.dispatch(addStrategy(reqObj));
	}

	sendStrategyDelete(id) {
		
		this.props.dispatch(deleteStrategy(id));
	}

	sendGoalEdits(id, obj) {
		this.props.dispatch(editGoal(id, obj));
	}

	sendActionEdits(id, reqObj) {
		this.props.dispatch(editAction(id, reqObj));
	}

	sendGoalCreate(reqObj) {
		
		this.props.dispatch(addGoal(reqObj));
	}

	sendAccomplishmentDelete(id) {
		this.props.dispatch(deleteAccomplishment(id));
	}

	sendActionAdd(id, reqObj) {
		this.props.dispatch(addAction(id, reqObj));
	}

	sendActionDelete(id) {
		this.props.dispatch(deleteAction(id));
	}

	componentDidMount() {
		this.props.dispatch(getGoals());
		this.props.dispatch(getStrategies());
		this.props.dispatch(getAllStrategies());
		this.props.dispatch(getAccomplishments());
		this.props.dispatch(getCategories());
	}


	handleTabClick(activeTab) {
		this.setState({
			activeTab
		})
	};

	render() {
		return (
			<div className='pad'>
				<div className='e-header-container'>
					<div className='e-header'>
						<div className='e-title'>
							EDIT
						</div>
						<div className='e-tabs'>
							<button onClick={e => this.handleTabClick('goals')}>
								GOALS
							</button>
							<button onClick={e => this.handleTabClick('strategies')}>
								STRATEGIES
							</button>
							<button onClick={e => this.handleTabClick('accomplishments')}>
								ACCOMPLISHMENTS
							</button>
						</div>
					</div>
				</div>
					{this.state.activeTab === 'strategies' && <EditorStrategies sendStrategyDelete={this.sendStrategyDelete} sendStrategyAdd={this.sendStrategyAdd} strategies={this.props.strategies} allStrategies={this.props.allStrategies} />}
					{this.state.activeTab === 'goals' &&
						<EditorGoals
							sendGoalEdits={this.sendGoalEdits}
							sendActionEdits={this.sendActionEdits}
							sendActionAdd={this.sendActionAdd}
							sendActionDelete={this.sendActionDelete}
							sendGoalCreate={this.sendGoalCreate}
							goals={this.props.goals}
							categories={this.props.categories}
						/>
					}
					{this.state.activeTab === 'accomplishments' &&
						<EditorAccomplishments
							accomplishments={this.props.accomplishments}
							sendAccomplishmentEdits={this.sendAccomplishmentEdits}
							sendAccomplishmentAdd={this.sendAccomplishmentAdd}
							sendAccomplishmentDelete={this.sendAccomplishmentDelete}
							categories={this.props.categories}
						/>
					}
				
			</div>

		)
	}

}

const mapStateToProps = (state) => {
	return {
		goals: state.app.goals,
		strategies: state.app.strategies,
		allStrategies: state.app.allStrategies,
		accomplishments: state.app.accomplishments,
		categories: state.app.categories,
	};
}

export default connect(mapStateToProps)(Editor)