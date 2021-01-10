import React, { useState } from 'react';
import Calendar from './components/Calendar';
import DetailModal from './components/DetailModal';
import './css/index.less';

const Index = () => {
	const [anyDateOrderInfo, setAnyDateOrderInfo] = useState({});
	const [isModalVisible, setIsModalVisible] = useState(false);

	function getTargetDateOrderInfo(res) {
		if (res.success) {
			setAnyDateOrderInfo(res);
			// console.log(res);
			setIsModalVisible(true);
		} else {
			setIsModalVisible(false);
		}
	}

	function closeModal() {
		setIsModalVisible(false);
	}

	return (
		<div className='plan-cale'>
			<Calendar onClick={getTargetDateOrderInfo} />
			<DetailModal
				anyDateOrderInfo={anyDateOrderInfo}
				isModalVisible={isModalVisible}
				onCloseModal={closeModal}
			/>
		</div>
	);
};

export default Index;
