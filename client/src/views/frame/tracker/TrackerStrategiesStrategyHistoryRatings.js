import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class TrackerStrategiesStrategyHistoryRatings extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return(
			<div className='tsshr-container'>
				<table className='tsshr-table'>
				{this.props.ratings.map(rating => (
					<tr>
						<td className='tsshr-date'>{moment(new Date(rating.date)).format('MMMM Do, YYYY')}</td>
						<td className='tsshr-rating'>{rating.value}</td>
					</tr>
				))}
				</table>

			</div>)
	}

}

export default connect()(TrackerStrategiesStrategyHistoryRatings)