import { Component } from 'react';
import { Row, Col } from 'antd';
class Block extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let style = {
			boxSizing: 'border-box',
			padding: '0px',
			height: '100%',
		};
		for (let item in this.props.style) {
			style[item] = this.props.style[item];
		}
		if (this.props.fontWeight) {
			style.fontWeight = this.props.fontWeight;
		}
		if (this.props.data && this.props.data instanceof Array) {
			return (
				<Row style={style} justify='space-around' align='middle'>
					{this.props.data.map((data, index) => {
						if (this.props.fontColor) {
							let color = this.props.fontColor;
							try {
								return (
									<Col key={index} style={{ color: color[data] }}>
										{data}
									</Col>
								);
							} catch {
								return <Col key={index}>{data}</Col>;
							}
						} else {
							return <Col key={index}>{data}</Col>;
						}
					})}
				</Row>
			);
		} else {
			return (
				<Row style={style} justify='space-around' align='middle'>
					<Col key={1}>{}</Col>
				</Row>
			);
		}
	}
}
export default Block;
