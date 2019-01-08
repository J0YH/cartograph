import React from 'react';
import { connect } from 'react-redux';
import EditorStrategiesSelected from './EditorStrategiesSelected';
import EditorStrategiesUnselected from './EditorStrategiesUnselected';

export class EditorStrategies extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidlMount() {

		console.log('component did mount indeed');
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps == this.props);

	}

	handleUndo(e) {
		//console.log('implement undo changes button')
	};


	handleSave(e) {
		//console.log('save button needs to capture input from child EditorStrategiesBox component')
	};



	render() {

		let unselectedStrategies = [];

		const allIds = this.props.allStrategies.map(strategy => {
			return strategy._id
		});

		console.log('allIds', allIds);

		const selectedIds = this.props.strategies.map(strategy => {
			return strategy.strategy._id
		});

		console.log(selectedIds);

		let unselectedIds = allIds.filter(id => !selectedIds.includes(id));


		console.log(unselectedIds);

		unselectedIds.forEach(id => {   
			this.props.allStrategies.map(strategy => {
			    if (strategy._id === id) {
			      unselectedStrategies.push(strategy);
			    }
		  	});
		});

		console.log(unselectedStrategies);
		
		return(
			<div className='es-container'>
				<div className='es-instructions'>
					Add or remove strategies to track below.
				</div>
				{this.props.strategies.map(strategy => {
					return (<EditorStrategiesSelected sendStrategyDelete={this.props.sendStrategyDelete} key={strategy._id} strategy={strategy} />)
				})}

				{unselectedStrategies.map(strategy => {
					return (<EditorStrategiesUnselected sendStrategyAdd={this.props.sendStrategyAdd} strategy={strategy} />

					)
				})}
			</div>)
	};

};


export default connect()(EditorStrategies)