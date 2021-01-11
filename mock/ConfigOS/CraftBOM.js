const configTemplate = {
    id: "",
    materialId: "",
    workingProcedureIdList: []
}

let defaultConfig = [{
    id: "1",
    materialId: "1240",
    workingProcedureIdList: ["1", "2", "3"]
}]

for (let i = 0; i < 10; i += 1) {
    if (Math.random() > 0.1) {
        defaultConfig.push({
            id: `${defaultConfig.length + 1}`,
            materialId: `${parseInt(Math.random() * 50 + 1230)}`,
            workingProcedureIdList: ["1", "2", "3"]
        })
    }
    for (let j = 0; j < 5; j++) {
        if (Math.random() > 0.1) {
            defaultConfig[defaultConfig.length - 1].workingProcedureIdList.push(
                `${parseInt(Math.random() * 10 + 1)}`
            )
        }
    }
}

export default {
    'get /api/config/craftBOM': (req, res) => {
        res.send({
            data: defaultConfig,
            success: true
        })
    },

    'post /api/config/craftBOM/edit': (req, res) => {
        try{
            let { newConfig } = req.body
            const index = defaultConfig.findIndex((config) => {
                return `${config.id}` === `${newConfig.id}`
            })
            if(index!==-1){
                defaultConfig[index]={
                    ...defaultConfig[index],
                    workingProcedureIdList:newConfig.workingProcedureIdList,
                }
            }else{
                defaultConfig.push({
                    id:new Date().getTime(),
                    ...newConfig
                })
            }
            res.send({
                data: defaultConfig,
                success: true
            })
        }catch(e){
            console.error(e)
        }
    },

    'post /api/config/craftBOM/del': (req, res) => {
        let { id } = req.body
        defaultConfig = defaultConfig.filter((config) => {
            config.id !== id
        })
        res.send({
            data: defaultConfig,
            success: true
        })
    },
}