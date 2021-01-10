const colors = ['#2FB0F1', '#2568D2', '#9833F3', '#582CE4'];

const CardItems = ({ orderDetailData = {}, index }) => {
	let backgroundColor = colors[index % 4] || '#2FB0F1';
	return (
		<div className='card-items' style={{ backgroundColor }}>
			<p className='count'>
				<span className='num'>{orderDetailData.count || '未知'}</span>
				<span className='unit'>个</span>
			</p>
			<p className='desc'>{orderDetailData.desc || ''}</p>
		</div>
	);
};

export default CardItems;
