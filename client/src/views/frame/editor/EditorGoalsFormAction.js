import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class EditorGoalsFormAction extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			name: this.props.action.name,
			dueDate: this.props.action.dueDate,
		};
	
	}

	changeField(e, field) {
		const input = e.target.value;

		if (field === 'name') {
			this.setState({
				name: input,
			});
		}
		if (field === 'dueDate') {
			this.setState({
				dueDate: input,
			})
		}
	}

	handleSave(e) {
		e.preventDefault();

		let reqObj = {};

		if (this.state.name) {
			reqObj.name = this.state.name;
		}

		if (this.state.dueDate) {
			reqObj.dueDate = this.state.dueDate;
		}

		if (this.props.formType === 'edit') {
			this.props.sendActionEdits(this.props.action._id, reqObj);
		};

		if (this.props.formType === 'create') {
			// need to write action and reducer for below, add function to Editor.js and pass down 
			// this.props.sendActionAdd(this.props.goalId);
			//console.log('need to finish this', this.props.goalId);
			//const goalIdAsString = this.props.goalId.toString();


			console.log(this.props.goalId, reqObj);
			this.props.sendActionAdd(this.props.goalId, reqObj);
		}
		
	}

	handleDelete(e) {
		e.preventDefault();
		console.log('this will eventually delete an action');

		this.props.sendActionDelete(this.props.action._id);
	}


	render() {
		
			return(
				<div className='egfa-action-box'>
					<div className='egfa-form-row'>
						<label className='egfa-label'>
							Name
						</label>
						<textarea
							className='egfa-input'
							onChange={e => this.changeField(e, 'name')}
							value={this.state.name}
							>
						</textarea>
					</div>

					<div className='egfa-form-row'>
						<label className='egfa-label'>
							Due Date
						</label>
						<input
							className='egfa-input'
							onChange={e => this.changeField(e, 'dueDate')}
							value={moment(new Date(this.state.dueDate)).format('YYYY-MM-DD')}
						>
						</input>
					</div>

					<div className='egfa-button-row'>
						<button className='egfa-save' onClick={e => this.handleSave(e)}>
							SAVE
						</button>
						<button className='egfa-delete' onClick={e => this.handleDelete(e)}>
							DELETE
						</button>
					</div>
				</div>
			)
		

	{/*

if (this.props.formType === 'create') {
			return(
				<div>
				<label>Action:</label>
					<input onChange={e => this.changeField(e, 'name')}/>
				<label>Due Date:</label>
					<input
						onChange={e => this.changeField(e, 'dueDate')}
						type='date'
					/>
				<button onClick={e => this.handleSave(e)}>
					Save
				</button>
				</div>
			)
		}

	*/}

		
		
	}
}



export default connect()(EditorGoalsFormAction)