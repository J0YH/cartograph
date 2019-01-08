import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { rateStrategy } from '../../../actions/action';


export class LogStrategiesRater extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRating: null,
		};
	}

	getToday() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1;
		const yyyy = today.getFullYear();
		if(dd<10) {
		    dd = '0'+dd
		} 
		if(mm<10) {
		    mm = '0'+mm
		} 
		today = yyyy + '/' + mm + '/' + dd;
		return today;
	}

	handleSubmit(e) {
		e.preventDefault();
		const strategyId = this.props.strategyId;
		const ratingObj = {
			'date': this.getToday(),
			'value': this.state.selectedRating
		};
		this.props.sendRateStrategy(strategyId, ratingObj);

		this.radioForm.reset();
	};

	handleRadioSelect(e) {
		this.setState({
			selectedRating: e.target.value,
		});
	}



	render() {
		return(
			<div className='lsr-container'>
				<p>Select your rating below:</p>
				<form ref={(el) => this.radioForm = el}>
					<label>
						<input
							type='radio'
							value='1'
							name='rating'
							onClick={e => this.handleRadioSelect(e)}
						/> 
						   1
					</label>
					<label>
						<input
							type='radio'
							value= '2'
							name='rating'
							onClick={e => this.handleRadioSelect(e)}
						/> 
						   2
					</label>
					<label>
						<input
							type='radio'
							value= '3'
							name='rating'
							onClick={e => this.handleRadioSelect(e)}
						/> 
						   3
					</label>
					<label>
						<input
							type='radio'
							value= '4'
							name='rating'
							onClick={e => this.handleRadioSelect(e)}
						/> 
						   4
					</label>
					<label>
						<input
							type='radio'
							value= '5'
							name='rating'
							onClick={e => this.handleRadioSelect(e)}
						/> 
						   5
					</label>
					<div>
						<button onClick={e => this.handleSubmit(e)}>SUBMIT</button>
					</div>
				</form>
			</div>
		)
	};

};

export default connect()(LogStrategiesRater)