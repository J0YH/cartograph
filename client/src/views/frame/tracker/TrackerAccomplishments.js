import React from 'react';
import { connect } from 'react-redux';
import TrackerAccomplishmentsAccomplishment from './TrackerAccomplishmentsAccomplishment';
//import { getAccomplishments } from '../../../actions/action';


export class TrackerAccomplishments extends React.Component {

	/* componentDidMount() {
		this.props.dispatch(getAccomplishments());
	}*/

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				{this.props.accomplishments.map(accomplishment =>
					(<TrackerAccomplishmentsAccomplishment accomplishment={accomplishment} categories={this.props.categories} />
				))}
			</div>)
	}

}

/*const mapStateToProps = (state) => {
	return {accomplishments: state.app.accomplishments}
};

export default connect(mapStateToProps)(TrackerAccomplishments)*/

export default connect()(TrackerAccomplishments)
