import React from 'react';
import { connect } from 'react-redux';
import EditorAccomplishmentsBox from './EditorAccomplishmentsBox';
import EditorAccomplishmentsNew from './EditorAccomplishmentsNew';
import plus from '../../../assets/plus.png';

export class EditorAccomplishments extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showForm: false,
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.accomplishments !== this.props.accomplishments) {
			this.setState({
				showForm: false,
			});
		}
	}

	handleShowForm(e) {
		e.preventDefault(e);
		this.setState({
			showForm: true,
		});

	}

	render() {
		return(
			<div>
				{this.props.accomplishments.map(accomplishment => {
					return <EditorAccomplishmentsBox
						key={accomplishment._id}
						accomplishment={accomplishment}
						sendAccomplishmentEdits={this.props.sendAccomplishmentEdits}
						sendAccomplishmentDelete={this.props.sendAccomplishmentDelete}
					/>
				})}
				
				{this.state.showForm ? 
					<EditorAccomplishmentsNew
						categories={this.props.categories}
						sendAccomplishmentAdd={this.props.sendAccomplishmentAdd}
					/>
					:
					<div className='eab-plus-container'>
						<button className='eab-plus' onClick={e=>{this.handleShowForm(e)}} >
							<img
								src={plus} style={{ width: '30px' }}
							/>

						</button>
					</div>
				}
			</div>)
	};

}


export default connect()(EditorAccomplishments)