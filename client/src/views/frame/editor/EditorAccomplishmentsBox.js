import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class EditorAccomplishmentsBox extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showForm: false,
			showAccomplishment: true,
			completedDate: this.props.accomplishment.completedDate,
			name: this.props.accomplishment.name,
			description: this.props.accomplishment.description,
		}
	};

	handleEditBtn(e) {
		this.setState({
			showForm: true,
			showAccomplishment: false
		})
	};

	handleDelete(e) {

		e.preventDefault();

		//alert('Are you sure yo?');

		this.setState({
			showAccomplishment: false,
		});

		this.props.sendAccomplishmentDelete(this.props.accomplishment._id);
	};

	handleSave(e) {
		e.preventDefault(e);

		let reqObj = {};

		if (this.state.name) {
			reqObj.name = this.state.name;
		};
		if (this.state.completedDate) {
			reqObj.completedDate = this.state.completedDate;
		};
		if (this.state.description) {
			reqObj.description = this.state.description;
		};

		this.props.sendAccomplishmentEdits(this.props.accomplishment._id, reqObj);
		
		this.setState({
			showForm: false,
			showAccomplishment: true,
		});
	}


	render() {
		return(
			<div>
				{this.state.showAccomplishment ? 
					<div className='eab-read'>
						<div className='eab-read-header'>
							<div className='eab-read-header-left'>
								{this.state.name}
							</div>
							<div className='eab-read-header-right'>
								<button onClick={e => this.handleEditBtn(e)}>EDIT</button>
								<button onClick={e => this.handleDelete(e)}>DELETE</button>
							</div>
						</div>
						<div className='eab-read-details'>
							<p>
								<span className='eab-bolder'>Completed Date</span>: {moment(new Date(this.state.completedDate)).format('MMMM Do, YYYY')}
							</p>
							<p>
								<span className='eab-bolder'>Description</span>: {this.state.description}
							</p>
						</div>
					</div>
				: null}

				{this.state.showForm ? 
					<form className='eab-edit'>
						<div className='eab-edit-button-row'>
							<button onClick={e => this.handleSave(e)}>SAVE</button>
							<button onClick={e => this.setState({showForm: false, showAccomplishment: true})}>CANCEL</button>
						</div>
						
						<div className='eab-edit-fields-container'>
							<div className='eab-edit-fields'>
								<div className='eab-edit-row'>
									<div className='eab-edit-label'>
										<label>
											Name
										</label>
									</div>
									<textarea
										className='eab-edit-input'
										value={this.state.name}
										onChange={e => this.setState({name: e.target.value})}
									/>
								</div>
								<div className='eab-edit-row'>
									<div>
										<label className='eab-edit-label'>
											Description
										</label>
									</div>
									<textarea
										className='eab-edit-input'
										value={this.state.description}
										onChange={e => this.setState({description: e.target.value})}
									/>
								</div>
								<div className='eab-edit-row'>
									<div>
										<label className='eab-edit-label'>
											Completed Date
										</label>
									</div>
									<input
										className='eab-edit-input'
										type='date'
										value={moment(new Date(this.state.completedDate)).format('YYYY-MM-DD')}
										onChange={e => this.setState({completedDate: e.target.value})}
									/>
								</div>
							</div>
						</div>
					</form>
				: null}
			</div>	
		)
	
	}

}

export default connect()(EditorAccomplishmentsBox)