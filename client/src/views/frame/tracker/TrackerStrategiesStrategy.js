import React from 'react';
import { connect } from 'react-redux';
import TrackerStrategiesStrategyHistory from './TrackerStrategiesStrategyHistory';
import downArrowWhite from '../../../assets/down-arrow-white.png';
import upArrowBlack from '../../../assets/up-arrow-black.png';

export class TrackerStrategiesStrategy extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showDetails: false,
		}
	};

	expandHandler() {
		this.setState({
			showDetails: !this.state.showDetails,
		})
		
	};

	findAvgRating() {
		if (this.props.strategy.rating.length > 0) {
			const ratingsObjects = this.props.strategy.rating;	

			const ratingsArray = ratingsObjects.map(a => a.value);

			const avgRating = ((ratingsArray.reduce((a,b) => a + b)) / ratingsArray.length).toFixed(1);
			
			return avgRating;
		}
	}

	render() {
		return(
			<div className='tss-box'>		
				<h4>{this.props.strategy.strategy.name.toUpperCase()}</h4>
				{this.props.strategy.rating.length > 0 ? 
					<div>
						<h3>{this.findAvgRating()}</h3>
						<p className='tss-avg-rating'>AVG RATING</p>
					</div>
					: <p className='tss-no-ratings'>No ratings yet</p>
				}
				<div className='tss-expand'>		
					<button onClick={e => this.expandHandler(e)}>
						{this.state.showDetails ?
							<img src={upArrowBlack} style={{ width: '35px' }} />
							: <img src={downArrowWhite} style={{ width: '35px' }} />
						}
					</button>
				</div>
				<div className='tss-expanded-container'>		
					{this.state.showDetails ? 
							<TrackerStrategiesStrategyHistory strategy={this.props.strategy}/>
					: null}
				</div>
			</div>)
	}

}

export default connect()(TrackerStrategiesStrategy)