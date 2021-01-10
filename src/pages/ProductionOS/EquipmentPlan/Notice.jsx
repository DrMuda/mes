import { Button, Input } from 'antd';

const Notice = () => {
	return (
		<>
			<div className='header-area'>
				<div className='action-area'>
					<div className='btns-area'>
						<Button type='primary'>新增</Button>
					</div>
					<div className='search-area'>
						<Input placeholder='盘点单号' style={{ width: 200, margin: '0 10px' }} />
						<Input placeholder='仓库' style={{ width: 60, margin: '0 10px' }} />
						<Button type='primary' style={{ margin: '0 10px' }}>
							查询
						</Button>
						<Button type='danger'>清空</Button>
					</div>
				</div>
			</div>
			<h1>666</h1>
		</>
	);
};

export default Notice;
