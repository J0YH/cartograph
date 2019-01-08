import React from 'react';
import { connect } from 'react-redux';

export class EditorStrategiesUnselected extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			buttonState: false,
		};
	}

	toggleButton(e) {
		e.preventDefault();
		this.setState({
			buttonState: !this.state.buttonState,
		});
		const reqObj = {
			'strategy': this.props.strategy._id
		};
		
		this.props.sendStrategyAdd(reqObj);
	}

	render() {

		//console.log('UNSELECTED RENDER', this.props);

		return(
			<div className='esu-strategy'>
				<h4>{this.props.strategy.name.toUpperCase()}</h4>
				<p>{this.props.strategy.description}</p>
				<div className='esu-source'>
					[ {this.props.strategy.source} ]
				</div>
				<button onClick={e => this.toggleButton(e)}>
					{this.state.buttonState ? <span>REMOVE</span> : <span>ADD</span>}
				</button>
			</div>
		)
	}

}

export default connect()(EditorStrategiesUnselected)