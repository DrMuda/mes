let defaultConfig = [
    {
        id: 624748504,
        name: 'ROG玩家国度',
        model: '冰刃4',
    },
];

for (let i = 0; i < 10; i++) {
    let conf = {
        id: (Math.random() * 99999 + Math.random() * 99999) | 0,
        name: `设备 ${i + 1}`,
        model: `Y${Math.random() * 99999 | 0}`,
    }
    defaultConfig.push(conf);
}



module.exports = {
    // 查询配置
    'GET /api/config/equipment': (req, res) => {
        res.send({
            data: defaultConfig,
            success: true
        })
    },

    // 删除配置
    'POST /api/config/equipment/del': (req, res) => {
        let { id: rowKey } = req.body;
        defaultConfig = defaultConfig.filter(item => {
            return item.id !== rowKey
        });
        res.send({
            data: defaultConfig,
            success: true
        })
    },

    // 编辑或添加配置
    'POST /api/config/equipment/edit': (req, res) => {
        let { newConfig } = req.body;

        let keys = Object.keys(newConfig);
        let insertData = [];

        keys.forEach(rowKey => {
            rowKey = (rowKey | 0);

            let findIndex = defaultConfig.findIndex(item => {
                return item.id === rowKey
            });

            if (findIndex > -1) {
                // 修改数据
                defaultConfig[findIndex] = { id: rowKey, ...newConfig[rowKey] }
            } else {
                // 新增数据
                let key = (Math.random() * 99999 + Math.random() * 99999) | 0;
                if (newConfig[rowKey].name && newConfig[rowKey].model) {
                    insertData.push({ id: key, ...newConfig[rowKey] })
                }
            }
        })

        defaultConfig = [...defaultConfig, ...insertData];

        res.send({
            data: defaultConfig,
            success: true
        })
    }
}