import { RingProgress } from '@ant-design/charts';
const colors = ['#2E95FB', '#F1857B', '#8B2EF8', '#FEBA33'];

const ProgressMap = ({ orderProgressData = {}, index }) => {
	const config = {
		height: 100,
		width: 100,
		autoFit: false,
		percent: orderProgressData.percent || 0,
		color: [colors[index % 4], '#0D286B'],
		statistic: {
			content: {
				style: {
					fontSize: 20,
					fill: colors[index % 4],
					fontWeight: 600,
				},
				formatter: (data) => {
					return Number.parseInt(data.percent * 100) + '%';
				},
			},
		},
	};
	return (
		<div>
			<RingProgress {...config} />
			{orderProgressData.completionTime && (
				<p className='completion-time'>{`${orderProgressData.completionTime} 完成`}</p>
			)}
		</div>
	);
};

export default ProgressMap;
