const EnvironmentMap = ({ environmentData }) => {
	return (
		<div className='environment-map'>
			<div className='items temperature'>
				<div className='info-txt'>
					<p className='tag'>温度</p>
					<p className='val'>{environmentData?.temperature}°C</p>
				</div>
			</div>
			<div className='items humidity'>
				<div className='info-txt'>
					<p className='tag'>湿度</p>
					<p className='val'>{environmentData?.humidity}%</p>
				</div>
			</div>
			<div className='items difference'>
				<div className='info-txt'>
					<p className='tag'>压力差</p>
					<p className='val'>{environmentData?.difference}Pa</p>
				</div>
			</div>
		</div>
	);
};

export default EnvironmentMap;
