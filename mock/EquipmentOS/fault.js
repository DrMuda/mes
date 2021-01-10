const stateEnum = {
    0: { text: '待处理' },
    1: { text: '处理中' },
    2: { text: '已处理' },
    3: { text: '已知晓' },
};

function getDate(type) {
    let d = new Date;
    let currentYear = d.getFullYear();
    let currentMonth = d.getMonth() + 1;
    let currentDate = d.getDate();
    let currentDay = d.getDay() + 1;
    let currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    let time = '';
    switch (type) {
        case 'today':
            time = `${currentYear}-${currentMonth}-${currentDate} 23:59:59`;
            break;
        case 'week':
            // 盘点是否达到了本周的最后一天
            let daysRemaining = 0;
            if (currentDay < 7) {
                daysRemaining = 7 - currentDay;
            }

            // 盘点是否超出了本月的范围
            let date = currentDate;
            if ((currentDate + daysRemaining) > currentMonthDays) {
                currentMonth++;
                date = (currentDate + daysRemaining) - currentMonthDays;
            }

            time = `${currentYear}-${currentMonth}-${date} 23:59:59`;
            break;
        case 'month':

            time = `${currentYear}-${currentMonth}-${currentMonthDays} 23:59:59`;
            break;

        case 'year':
            let monthDays = new Date(currentYear, 12, 0).getDate();
            time = `${currentYear}-12-${monthDays} 23:59:59`;
            break;
    }

    return new Date(time).getTime();
}

const dateEnum = {
    0: getDate('today'),
    1: getDate('week'),
    2: getDate('month'),
    3: getDate('year'),
}

const tableListDataSource = [];

for (let i = 0; i < 10; i += 1) {
    tableListDataSource.push({
        key: i,
        number: Date.now(),
        equipmentNumber: Date.now(),
        name: '设备 A' + i,
        address: 'XX位置',
        content: '零件损坏',
        level: i + 1 + '级',
        occurrenceDate: Date.now(),
        completionDate: Date.now(),
        status: stateEnum[Math.floor(Math.random() * 10) % 4].text,
    });
}

module.exports = {
    // 获取故障列表
    'GET /api/fault/faultlist': (req, res) => {

        let { stateFilter, dateFilter, rangeDateStart, rangeDateEnd } = req.query;

        let faultList = tableListDataSource.slice();

        // 过滤状态
        if (stateFilter && !/^-1$/.test(stateFilter)) {
            faultList = faultList.filter(item => {
                return item.status === stateEnum[stateFilter].text;
            })
        }

        // 过滤日期周期
        if (dateFilter) {
            faultList = faultList.filter(item => {
                return item.occurrenceDate <= dateEnum[dateFilter];
            })
        }

        if (rangeDateStart && rangeDateEnd) {
            faultList = faultList.filter(item => {
                let start = item.occurrenceDate >= new Date(rangeDateStart).getTime();
                let end = item.occurrenceDate <= new Date(rangeDateEnd).getTime();
                return start && end;
            })
        }

        res.send({
            data: faultList,
            success: true
        })
    },

    // 获取故障详情
    'GET /api/fault/faultdetail': (req, res) => {
        let { id } = req.query;

        let detail = tableListDataSource.find(item => {
            return item.number === Number(id);
        });

        res.send({
            data: detail,
            success: true
        })
    }
}