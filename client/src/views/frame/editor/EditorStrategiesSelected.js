import React from 'react';
import { connect } from 'react-redux';

export class EditorStrategiesSelected extends React.Component {

	toggleButton(e) {
		e.preventDefault();
		this.props.sendStrategyDelete(this.props.strategy.strategy._id);
	}

	render() {
		//console.log('SELECTED RENDER', this.props);
		return(
			<div className='ess-strategy'>
				<h4>{this.props.strategy.strategy.name.toUpperCase()}</h4>
				<p>{this.props.strategy.strategy.description}</p>
				<div className='ess-source'>
					[ {this.props.strategy.strategy.source} ]
				</div>
				<button onClick={e => this.toggleButton(e)}>
					<span>REMOVE</span>
				</button>
			</div>
		)
	}

}

export default connect()(EditorStrategiesSelected)