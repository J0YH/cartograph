import React from 'react';
import { connect } from 'react-redux';
import { Prompt, Redirect } from 'react-router-dom';
import moment from 'moment';
import EditorGoalsFormAction from './EditorGoalsFormAction';
import EditorGoalsFormNewAction from './EditorGoalsFormNewAction';
import plus from '../../../assets/plus.png';

export class EditorGoalsForm extends React.Component {
//not showing completed actions for now - eventually show and create alert to confirm changing

	constructor(props) {
		super(props);

		if (this.props.formType === 'edit') {
			this.state = {
				showAddButton: true,
				showAddAction: false,
				name: this.props.goal.name,
				description: this.props.goal.description,
				category: this.props.goal.category,
				dueDate: this.props.goal.dueDate,
				actions: this.props.goal.actions,
				block: false,
			};

		}

		if (this.props.formType === 'create') {
			this.state = {
				showAddButton: true,
				showAddAction: false,
				name: null,
				description: null,
				category: null,
				dueDate: null,
				actions: null,	
				redirect: false,
			};
		}
		
	};


	componentDidUpdate(prevProps) {
		if (this.props.formType === 'edit') {
			if (this.props.goal.name !== prevProps.goal.name) {
				this.setState({name: this.props.goal.name});
			} 
			if (this.props.goal.description !== prevProps.goal.description) {
				this.setState({description: this.props.goal.description});
			} 
			if (this.props.goal.category !== prevProps.goal.category) {
				this.setState({category: this.props.goal.category});
			}
			if (this.props.goal.dueDate !== prevProps.goal.dueDate) {
				this.setState({dueDate: this.props.goal.dueDate});
			}
			if (this.props.goal.actions !== prevProps.goal.actions) {
				this.setState({
					actions: this.props.goal.actions,
					showAddButton: true,
					showAddAction: false,
				});
			}
		}

	}

	changeField(e, field) {
		const input = e.target.value;

		if (field === 'name') {
			this.setState({
				name: input,
			});
		}
		if (field === 'description') {
			this.setState({
				description: input,
			});
		}
		if (field === 'category') {
			this.setState({
				category: input,
			});
		}
		if (field === 'dueDate') {
			this.setState({
				dueDate: input,
			});
		}
		/*if (field === 'actions') {
			this.setState({
				name: input,
			});
		}*/
	}

	handleSave(e) {
		e.preventDefault();

		let editGoalObj = {};

		if (this.state.name) {
			editGoalObj.name = this.state.name;
		};

		if (this.state.description) {
			editGoalObj.description = this.state.description;
		};

		if (this.state.category) {
			editGoalObj.category = this.state.category;
		};
		if (this.state.dueDate) {
			editGoalObj.dueDate = this.state.dueDate;
		};

		this.props.sendGoalEdits(this.props.goal._id, editGoalObj);

	}

	handleSaveAdd(e) {
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
		if (this.state.dueDate) {
			reqObj.dueDate = this.state.dueDate;
		};

		this.props.sendGoalCreate(reqObj);
		this.setState({redirect: true});
	}

	handleCancel(e) {
		e.preventDefault();

		if (this.state.name !== this.props.goal.name ||
			this.state.description !== this.props.goal.description ||
			this.state.category !== this.props.goal.category ||
			this.state.dueDate !== this.props.goal.dueDate ||
			this.state.actions !== this.props.goal.actions) {
				this.setState({
					block: true,
				});
		}
		
		window.history.back();
	}


	handleAddAction(e) {
		e.preventDefault();
		this.setState({
			showAddAction: true,
		});
	}

	render() {
		if(this.props.formType === 'edit') {
			const currentGoal = this.props.goal;
			return (
				<div className='egf-container'>
					
					<div className='egf-header'>
						DETAILS
					</div>
					<div className='egf-form-area'>

						<div className='egf-form-row'>
							<div className='egf-label'>
								<label>
									Goal
								</label>
							</div>
							<textarea
								className='egf-input'
								onChange={e => this.changeField(e, 'name')}
								value={this.state.name}>
							</textarea>
						</div>


						<div className='egf-form-row'>
							<div className='egf-label'>
								<label>
									Description
								</label>
							</div>
							<textarea
								className='egf-input'
								onChange={e => this.changeField(e, 'description')}
								value={this.state.description}
							>
							</textarea>
						</div>
						

						<div className='egf-form-row'>
							<div className='egf-label'>
								<label>
									Category
								</label>
							</div>
							<select
								className='egf-select'
								onChange={e => this.changeField(e, 'category')}
								value={this.state.category}
							>
								<option value="" selected disabled>Select goal category</option>
								{this.props.categories.map(cat => {
										return <option key={cat._id} value={cat._id}>{cat.name}</option>
									})
								}
							</select>
						</div>
						
						<div className='egf-form-row'>
							<div className='egf-label'>
								<label>
									Due date
								</label>
							</div>
							<input
								className='egf-input'
								onChange={e => this.changeField(e, 'dueDate')}
								value={moment(new Date(this.state.dueDate)).format('YYYY-MM-DD')}
								type="date"
							>
							</input>
						</div>

					</div>
					<div className='egf-button-row'>

						<button
							className='egf-save'
							onClick={e=>this.handleSave(e)}
						>
							SAVE
						</button>
						<button
							className='egf-cancel'
							onClick={e=>this.handleCancel(e)}
						>
							CANCEL
						</button>
					</div>
					
					<div className='egf-header'>
						ACTIONS
					</div>

					<div>
						{this.props.goal.actions.map(action => {
							if (!action.completedDate) {
								return <EditorGoalsFormAction
									key={action._id}
									action={action}
									sendActionEdits={this.props.sendActionEdits}
									sendActionAdd={this.props.sendActionAdd}
									sendActionDelete={this.props.sendActionDelete}
								/>
							}	
						})}
						<div>
							{this.state.showAddAction ? 
								<EditorGoalsFormNewAction
									goalId={this.props.goal._id}
									sendActionAdd={this.props.sendActionAdd}
								/>
								:
								<div className='egf-plus-container'>
									<button className='egf-plus' onClick={e=>{this.handleAddAction(e)}} >
										<img
											src={plus} style={{ width: '35px' }}
										/>

									</button>
								</div>
							}
						</div>
					</div>

					<Prompt
					      when={this.state.block} 
					      message='Abandon changes?'
					/>

				</div>
			)
		}		

		if (this.props.formType === 'create') {
			return(
				<div className='egf-container'>
					<div>
						<div className='egf-header'>
							DETAILS
						</div>

						<div className='egf-form-area'>
							<div className='egf-form-row'>
								<div className='egf-label'>
									<label>
										Goal
									</label>
								</div>
								<textarea
									className='egf-input'
									onChange={e => this.changeField(e, 'name')}
									placeholder='Name your goal'
								/>
							</div>


							<div className='egf-form-row'>
								<div className='egf-label'>
									<label>Description</label>
								</div>
								<textarea
									className='egf-input'
									onChange={e => this.changeField(e, 'description')}
									placeholder='Add a description'
								/>
							</div>

							<div className='egf-form-row'>
								<div className='egf-label'>
									<label>Category</label>
								</div>
								<select
									className='egf-select'
									onChange={e => this.changeField(e, 'category')}
								>
									<option value="" selected disabled>Select goal category</option>
									{this.props.categories.map(cat => {
											return <option key={cat._id} value={cat._id}>{cat.name}</option>
										})
									}
								</select>
							</div>


							<div className='egf-form-row'>
								<div className='egf-label'>
									<label>
										Due date
									</label>
								</div>
								<input
									type='date' 
									onChange={e => this.changeField(e, 'dueDate')}
									className='egf-input'
								/>
							</div>

							<div className='egf-button-row'>
								<button
									className='egf-save'
									onClick={e => {this.handleSaveAdd(e)}}>
									SAVE
								</button>
							</div>
						</div>

						<div>
							<div className='egf-header'>
								ACTIONS
							</div>
							<p className='egf-action-instructions'>
								Save new goal in order to add actions.
							</p>
						</div>
					</div>
					{this.state.redirect ? 
						<Redirect to='/frame/editor' />
						: null
					}

				</div>
			)
		}
		

	}

}

export default connect()(EditorGoalsForm)