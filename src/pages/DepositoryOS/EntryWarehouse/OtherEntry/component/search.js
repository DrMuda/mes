import { Component } from 'react';
import React from 'react'
import { Input, Button } from 'antd'

/**
 * @param {Array} fields 需要进行搜索的字段
 * @param {Function} onSearch 
 */
class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filterKeys: {}
		}
		this.onSearch = this.onSearch.bind(this)
	}
	
	componentDidMount() {
		if (this.props.fields instanceof Array) {
			const filterKeys = {}
			this.props.fields.map((field) => {
				filterKeys[field.key] = ""
				return field
			})
			this.setState(filterKeys)
		}
	}

	onSearch() {
		this.props.onSearch(this.state.filterKeys)
	}

	render() {
		let InputList = []
		if (this.props.fields instanceof Array) {
			InputList = this.props.fields.map((field) => {
				field
				return <Input
					placeholder={field.placeholder}
					style={{ width: '100px', marginRight: '8px' }}
					key={field.key}
					value={this.state.filterKeys[field.key]}
					onChange={(e) => {
						const filterKeys = {}
						filterKeys[field.key] = e.target.value
						this.setState({
							filterKeys: {
								...this.state.filterKeys,
								...filterKeys
							}
						})
					}}
					onPressEnter={() => {
						this.onSearch()
					}} />
			})
		}
		return (
			<>
				{InputList}
				<Button
					onClick={() => {
						this.onSearch()
					}}
					style={{ background: '#389e0d', color: '#fff', marginRight: '8px' }}>
					查询
				</Button>
				<Button
					onClick={() => {
						this.setState({
							filterKeys: {}
						}, () => {
							this.onSearch()
						});
					}}
					style={{ background: '#1890ff', color: '#fff', marginRight: '8px' }}>
					清空
				</Button>
			</>
		)
	}
}
export default Search