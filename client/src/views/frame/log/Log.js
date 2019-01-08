import React from 'react';
import { connect } from 'react-redux';
import LogGoals from './LogGoals';
import LogStrategies from './LogStrategies';
import './Log.css';
import { getGoals, getStrategies, rateStrategy } from '../../../actions/action';

export class Log extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.match.params.tab ? this.props.match.params.tab : 'goals',
			refreshActions: false,
			refreshStrategies: false,
		};

		this.completeActionRefresh = this.completeActionRefresh.bind(this);
		this.sendRateStrategy = this.sendRateStrategy.bind(this);
	};

	completeActionRefresh() {
		this.setState({
			refreshActions: !this.state.refreshActions,
		});
	}

	sendRateStrategy(strategyId, ratingObj) {
		this.props.dispatch(rateStrategy(strategyId, ratingObj));
		// this.setState({
		// 	refreshStrategies: !this.state.refreshStrategies,
		// });
	}

	componentDidMount() {
		this.props.dispatch(getGoals());
		this.props.dispatch(getStrategies());
	}

	handleTabClick(activeTab) {
		this.setState({
			activeTab
		});
	}

	render() {





		return (
			<div className='pad'>
			
				<div className='l-header-container'>
					<div className='l-header'>
						<div className='l-title'>
							LOG
						</div>
						<div className='l-tabs'>
							<button onClick={e => this.handleTabClick('goals')}>
								ACTIONS
							</button>
							<button onClick={e => this.handleTabClick('strategies')}>
								STRATEGIES
							</button>
						</div>
					</div>
				</div>

				{this.state.activeTab === 'strategies' && <LogStrategies sendRateStrategy={this.sendRateStrategy} strategies={this.props.strategies} />}
				{this.state.activeTab === 'goals' && <LogGoals goals={this.props.goals} refresh={this.completeActionRefresh} />}
			
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		goals: state.app.goals,
		strategies: state.app.strategies,
	}
};

export default connect(mapStateToProps)(Log);
