import { message } from 'antd'
import { writeExcel, readExcel } from '@/utils/operationExcel';
import { queryCheckDetail, uploadOrderExcel, createCheckOrder, review, delOrder } from '@/services/DepositoryOS/stock';


// 创建盘点单
export async function createOrderExcel(row) {
    let { success } = await createCheckOrder({ orderNumber: row.numbers });
    if (success) {
        message.success('盘点单已生成');
    } else {
        message.error('盘点单创建失败');
    }
}

// 下载盘点单
export async function downloadOrderExcel(row) {
    let { data, success } = await queryCheckDetail({ orderNumber: row.numbers });
    if (!success) return message.error('获取盘点单详情失败');
    // 生成excel文件并下载
    data = data.map(item => {
        item.firmOffer = 0;
        item.breakEven = 0;
        return item;
    })
    writeExcel(data, `盘点单-${row.numbers}`);
}

// 上传excel表
export function uploadExcel(row) {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
    fileInput.onchange = async (e) => {
        let { files } = e.target;
        let [data] = await readExcel(files);
        // 得到表数据
        let sheetData = data.sheet[0].data;
        // 获取盘点单号
        let orderNumber = row.numbers;
        // 将这2个数据提交给后台
        let { success } = await uploadOrderExcel({ orderNumber, sheetData })
        if (success) {
            message.success('上传成功');
        } else {
            message.error('上传失败');
        }
    };
}

// 审核盘点单
export async function reviewCheckOrder(row) {
    let { success } = await review({ orderNumber: row.numbers });
    if (success) {
        message.success('审核成功');
        this.current.reload();
    } else {
        message.error('审核失败');
    }
}

// 删除盘点单
export async function delCheckOrder(row) {
    let { success } = await delOrder({ orderNumber: row.numbers });
    if (success) {
        message.success('删除成功');
        this.current.reload();
    } else {
        message.error('删除失败');
    }
}