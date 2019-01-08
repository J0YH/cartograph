import React from 'react';
import { connect } from 'react-redux';
import LogStrategiesRater from './LogStrategiesRater';

export class LogStrategies extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			strategy: null,
			showRater: false,
			// refresh: false,
		};
	};

	// below is workaround to get rater to re-appear upon Redirect from LogStrategiesRater;
	// works but unclear if best way
	// componentDidUpdate(prevProps) {
	// 	if (prevProps !== this.props) {
	// 		this.setState({
	// 			strategy: null,
	// 			showRater: false,
	// 		});
	// 	}
	// }

	changeHandler(e) {
		const selectedStrategyId = e.target.value;

		this.setState({
			selectedStrategyId: selectedStrategyId,
			// refresh: !this.state.refresh,
			showRater: true,
		});
	};

	render() {
		return(
			<div className='ls-container'>
				<div className='ls-select-container'>
					<select className='ls-select' onChange={e => this.changeHandler(e)}>
						<option value="" selected disabled>Choose strategy to rate</option>
						{this.props.strategies.map(strategy => {
							return <option key={strategy._id} value={strategy._id} label={strategy.strategy.name}></option>
						})}
					</select>
				</div>
				<div className='ls-rater-container'>
					{	// same question as LogGoals - how to get below component to get selected strategy?
						this.state.showRater ?
							<LogStrategiesRater sendRateStrategy={this.props.sendRateStrategy} strategyId={this.state.selectedStrategyId} />
						: null
					}
				</div>
			</div>)
	}

}

export default connect()(LogStrategies)
