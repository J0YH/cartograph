import React from 'react';
import { connect } from 'react-redux';
import TrackerStrategiesStrategyHistoryRatings from './TrackerStrategiesStrategyHistoryRatings'

export class TrackerStrategiesStrategyHistory extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		const description = this.props.strategy.strategy.description;
		const source = this.props.strategy.strategy.source;

		return(
			<div className='tssh-container'>
				<div className='tssh-details'>
					<p>{description}</p>
					<p className='tssh-source'>[ {source} ]</p>
				</div>
				<TrackerStrategiesStrategyHistoryRatings ratings={this.props.strategy.rating} />
			</div>)
	}

}

export default connect()(TrackerStrategiesStrategyHistory)