import { useEffect, useRef } from 'react';

const NoticeList = ({ noticeListData = [] }) => {
	let noticeList = useRef();

	if (noticeListData.length > 0) {
		noticeListData.push(noticeListData[0]);
	}

	useEffect(() => {
		let listDom = noticeList.current;
		let childrenDom = listDom.children;
		let parentHeight = listDom.parentElement.offsetHeight;
		let listDomHeight = listDom.offsetHeight;
		let childrenDomHeight = childrenDom[0]?.offsetHeight || 0;
		let currentIndex = 0;
		let timer = null;

		timer = setInterval(() => {
			let moveTop = currentIndex * (childrenDomHeight+6);

			listDom.style.top = `-${moveTop}px`;
			currentIndex++;

			if (listDomHeight - moveTop < parentHeight) {
				currentIndex = 0;
			}
		}, 1500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='notice-area'>
			<div className='notice-item notice-head'>
				<span className='date-time'>时间</span>
				<span className='msg'>内容</span>
			</div>
			<div className='scroll-list-box'>
				<ul className='notice-list' ref={noticeList}>
					{noticeListData.length &&
						noticeListData.map((notice, index) => {
							return (
								<li
									className='notice-item notice-body'
									key={`home-page-notice-item-${index}`}>
									<span className='date-time'>{notice.date}</span>
									<span className='msg'>{notice.msg}</span>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default NoticeList;
