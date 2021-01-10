import React, { Component } from 'react';
import equipmentDetailCSS from '../css/equipmentDetail.less';

export class EquipmentDetail extends Component {
	render() {
		return (
			<>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>设备名称：</span>
					<span className={equipmentDetailCSS['val']}>
						{this.props.data.equipmentName}
					</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>隶属工序：</span>
					<span className={equipmentDetailCSS['val']}>{this.props.data.belong}</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>所在位置：</span>
					<span className={equipmentDetailCSS['val']}>
						{this.props.data.currentAddress}
					</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>生产厂商：</span>
					<span className={equipmentDetailCSS['val']}>
						{this.props.data.manufacturer}
					</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>设备型号：</span>
					<span className={equipmentDetailCSS['val']}>
						{this.props.data.equipmentModel}
					</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>设备生产时间：</span>
					<span className={equipmentDetailCSS['val']}>
						{this.props.data.productionTime}
					</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>投入使用时间：</span>
					<span className={equipmentDetailCSS['val']}>
						{this.props.data.productionTime}
					</span>
				</p>
				<p className={equipmentDetailCSS['info-row']}>
					<span className={equipmentDetailCSS['key']}>经销商：</span>
					<span className={equipmentDetailCSS['val']}>{this.props.data.distributor}</span>
				</p>
			</>
		);
	}
}

export default EquipmentDetail;
