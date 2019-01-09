import React from 'react';
import { connect } from 'react-redux';
import TrackerStrategiesStrategy from './TrackerStrategiesStrategy';


export class TrackerStrategies extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.strategies) {
			return(<div>No strategies yet. Add one here.</div>)
		}

		if (this.props.strategies) {
			return(
				<div className='tss-row'>{this.props.strategies.map(strategy => (
					<TrackerStrategiesStrategy strategy={strategy}/>
					))}
				</div>
			)
		}
	}

}

export default connect()(TrackerStrategies)