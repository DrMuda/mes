import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderDetails from '@/pages/DepositoryOS/Stock/OrderDetails';
// import StockDetail from '@/pages/DepositoryOS/Stock/StockDetail'

configure({ adapter: new Adapter() });

describe('测试——库存管理', () => {
	it('OrderDetails的元素能正常被渲染', () => {
		const props = {
			location: {
				query: {
					number: 1608605976680,
					date: '2020/12/22:20 上午 10:59:36',
					warehouse: 'XXX',
				},
			},
		};
		const el = shallow(<OrderDetails {...props} />);
		expect(el.find('.order-detail-box').exists()).toBeTruthy();
		expect(el.find('.area-col')).toHaveLength(3);
	});

	// it('StockDetail 数据是否存在', () => {
	//     const el = shallow(<StockDetail />)
	//     const tableListDataSource = el.state('tableListDataSource');
	//     console.log(tableListDataSource)
	// })
});
