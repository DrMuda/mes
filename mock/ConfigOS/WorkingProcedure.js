let workingProcedureList = [
    {
        id: "1",
        code:"shumian",
        name: "梳棉"
    },
    {
        id: "2",
        code:"bingtiao",
        name: "并条"
    },
    {
        id: "3",
        code:"cusha",
        name: "粗纱"
    },
    {
        id: "4",
        code:"xisha",
        name: "细纱"
    },
    {
        id: "5",
        code:"luotong",
        name: "络筒"
    }
]

export default {
    // 获取工序列表
    'get /api/config/workingProcedure': (req, res) => {
        res.send({
            data: workingProcedureList,
            success: true
        })
    },

    // 删除某条工序
    'post /api/config/workingProcedure/del': (req, res) => {
        const { id } = req.body
        workingProcedureList = workingProcedureList.filter((workingProcedure) => {
            return workingProcedure.id !== id
        })
        res.send({
            data: workingProcedureList,
            success: true
        })
    },

    // 增加或修改工序
    'post /api/config/workingProcedure/edit': (req, res) => {
        const { newWorkingProcedure } = req.body
        if (newWorkingProcedure) {
            const index = workingProcedureList.findIndex((workingProcedure) => {
                return workingProcedure.id === newWorkingProcedure.id
            })
            if (index !== -1) {
                workingProcedureList[index] = {
                    ...workingProcedureList[index],
                    ...newWorkingProcedure
                }
            } else {
                workingProcedureList.push({
                    ...newWorkingProcedure,
                })
            }
            res.send({
                data: workingProcedureList,
                success: true
            })
        } else {
            res.send({
                data: workingProcedureList,
                success: false
            })
        }
    }
}