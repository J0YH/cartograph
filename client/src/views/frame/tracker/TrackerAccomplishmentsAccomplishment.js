import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class TrackerAccomplishmentsAccomplishment extends React.Component {

	constructor(props) {
		super(props);

		const categoriesArray = this.props.categories;
		const accompCategoryId = this.props.accomplishment.category;
		this.accompCategoryObj = categoriesArray.find(category => category._id === accompCategoryId);
	}

	render() {
		return(
			<div className='taa'>
				<div className='taa-header'>
					<h3>{this.props.accomplishment.name}</h3>
					<h4>
						{moment(new Date(this.props.accomplishment.completedDate)).format('MMMM Do, YYYY')}
					</h4>
				</div>
				<div className='taa-details'>	
					<p><span className='taa-bolder'>Category: </span>{this.accompCategoryObj.name}</p>
					<p><span className='taa-bolder'>Description: </span>{this.props.accomplishment.description}</p>
				</div>
			</div>)
	}
}

export default connect()(TrackerAccomplishmentsAccomplishment)