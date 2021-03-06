import React from 'react';
import { connect } from 'react-redux';

export class EditorStrategiesUnselected extends React.Component {

	toggleButton(e) {
		e.preventDefault();

		const reqObj = {
			'strategy': this.props.strategy._id
		};
		
		this.props.sendStrategyAdd(reqObj);
	}

	render() {
		return(
			<div className='esu-strategy'>
				<h4>{this.props.strategy.name.toUpperCase()}</h4>
				<p>{this.props.strategy.description}</p>
				<div className='esu-source'>
					[ {this.props.strategy.source} ]
				</div>
				<button onClick={e => this.toggleButton(e)}>
					<span>ADD</span>
				</button>
			</div>
		)
	}

}

export default connect()(EditorStrategiesUnselected)