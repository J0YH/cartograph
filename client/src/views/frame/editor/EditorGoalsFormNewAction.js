import React from 'react';
import { connect } from 'react-redux';

export class EditorGoalsFormNewAction extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
				name: null,
				dueDate: null,
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

		this.props.sendActionAdd(this.props.goalId, reqObj);
	}


	render() {
		return(
			<div className='egfna-action-box'>
				<div className='egfna-form-row'>
					<label className='egfna-label'>
						Name
					</label>
					<textarea
						className='egfna-input'
						onChange={e => this.changeField(e, 'name')}
					>
					</textarea>
				</div>

				<div className='egfna-form-row'>
					<label className='egfna-label'>
						Due Date
					</label>
					<input
						className='egfna-input'
						onChange={e => this.changeField(e, 'dueDate')}
						type='date'
					/>
				</div>

				<div className='egfna-button-row'>
					<button onClick={e => this.handleSave(e)}>
						SAVE
					</button>
				</div>

			</div>
		)
	}

}

export default connect()(EditorGoalsFormNewAction)