import React, { Component } from 'react';
import { Line } from '@ant-design/charts';

class Charts extends Component {
	render() {
		return <Line {...this.props} />;
	}
}

export default Charts;
