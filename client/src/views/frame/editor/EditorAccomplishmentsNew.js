import React from 'react';
import { connect } from 'react-redux';

export class EditorAccomplishmentsNew extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: null,
			description: null,
			category: null,
			completedDate: null,
		};
	}

	handleSave(e) {
		e.preventDefault(e);
		
		let reqObj = {};

		if (this.state.name) {
			reqObj.name = this.state.name;
		};
		if (this.state.description) {
			reqObj.description = this.state.description;
		};
		if (this.state.category) {
			reqObj.category = this.state.category;
		};
		if (this.state.completedDate) {
			reqObj.completedDate = this.state.completedDate;
		};
		
		console.log(reqObj);

		this.props.sendAccomplishmentAdd(reqObj);
	};

	render() {
		return(
			<form className='ean-box'>
				<div className='ean-button-row'>
					<button onClick={e => this.handleSave(e)}>SAVE</button>
				</div>
				<div className='ean-fields-container'>
					<div className='ean-fields'>
						<div className='ean-field-row'>
							<div className='ean-label'>
								<label>
									Accomplishment 
								</label>
							</div>
							<input
								className='ean-input'
								type='text'
								onChange={e => this.setState({name: e.target.value})}
							/>
						
						</div>

						<div className='ean-field-row'>
							<div className='ean-label'>
								<label>
									Description 
								</label>
							</div>
							<input
								className='ean-input'
								type='text'
								onChange={e => this.setState({description: e.target.value})}
							/>
						</div>

						<div className='ean-field-row'>
							<div className='ean-label'>
								<label>Category</label>
							</div>
							<div className='ean-select-container'>
								<select
									className='ean-select'
									onChange={e => this.setState({category: e.target.value})}
									value={this.state.category}
								>
									<option value="" selected disabled>Select goal category</option>
									{this.props.categories.map(cat => {
											return <option key={cat._id} value={cat._id}>{cat.name}</option>
										})
									}
								</select>
							</div>
						</div>

						<div className='ean-field-row'>
							<div className='ean-label'>
								<label>
									Completed Date
								</label>
							</div>
							<input
								className='ean-input'
								type='date'
								onChange={e => this.setState({completedDate: e.target.value})}
							/>
						</div>
					</div>
				</div>
			</form>
		)
	}

}

export default connect()(EditorAccomplishmentsNew)