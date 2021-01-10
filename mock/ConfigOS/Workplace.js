const belong = [
    { id: 'belong1', text: '打铁部' },
    { id: 'belong2', text: '搬砖部' },
    { id: 'belong3', text: '屌丝部' },
    { id: 'belong4', text: '精神小伙部' },
];

let defaultConfig = [];

for (let i = 0; i < 10; i++) {
    let conf = {
        id: (Math.random() * 99999 + Math.random() * 99999) | 0,
        name: `工位 ${i + 1}`,
        number: `G${Math.random() * 99999 | 0}`,
        belong: belong[Math.floor(Math.random() * 10) % 4].id,
    }
    defaultConfig.push(conf);
}



module.exports = {
    // 查询配置
    'GET /api/config/workplace': (req, res) => {
        res.send({
            data: defaultConfig,
            success: true
        })
    },

    // 删除配置
    'POST /api/config/workplace/del': (req, res) => {
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
    'POST /api/config/workplace/edit': (req, res) => {
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
                if (newConfig[rowKey].name && newConfig[rowKey].number && newConfig[rowKey].belong) {
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