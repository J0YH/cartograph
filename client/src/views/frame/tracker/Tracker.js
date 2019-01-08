import React from 'react';
import { connect } from 'react-redux';
import TrackerGoals from './TrackerGoals';
import TrackerStrategies from './TrackerStrategies';
import TrackerAccomplishments from './TrackerAccomplishments';
import './Tracker.css'
import { getGoals, getStrategies, getAccomplishments, getCategories } from '../../../actions/action';

export class Tracker extends React.Component {

	// componentWillMount() {
	// 	this.props.dispatch(getCategories());
	// }

	componentDidMount() {
		this.props.dispatch(getGoals());
		this.props.dispatch(getStrategies());
		this.props.dispatch(getAccomplishments());
		this.props.dispatch(getCategories());
	}

	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.match.params.tab ? this.props.match.params.tab : 'goals'
		};

	};

	handleTabClick(activeTab) {
		this.setState({
			activeTab
		})
	};

	render() {
		if (this.props.categories) {
			return (		
				<div className='pad'>
					<div className='t-header-container'>
						<div className='t-header'>
							<div className='t-title'>
								TRACK
							</div>
							<div className='t-tabs'>
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
					{this.state.activeTab === 'goals' && <TrackerGoals goals={this.props.goals} categories={this.props.categories} />}
					{this.state.activeTab === 'strategies' && <TrackerStrategies strategies={this.props.strategies} />}
					{this.state.activeTab === 'accomplishments' && <TrackerAccomplishments accomplishments={this.props.accomplishments} categories={this.props.categories} />}
				</div>
			)
		}

	return (
		<div>Loading...</div>
	)


	}
}

const mapStateToProps = (state) => {
	return {
		goals: state.app.goals,
		strategies: state.app.strategies,
		accomplishments: state.app.accomplishments,
		categories: state.app.categories,
	}
};

export default connect(mapStateToProps)(Tracker)
