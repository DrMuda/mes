const configTemplate={
    id:"",
    materialId:"",
    used_num:"",
    children:[]
}

let defaultConfig={
    id:"",
    materialId:"",
    used_num:null,
    children:[]
}

for(let i=0;i<20;i++){
    if(Math.random()>0.1){
        addConfig(defaultConfig)// 一级
        for(let j=0;j<10;j++){
            if(Math.random()>0.6){
                const length1 = defaultConfig.children.length
                addConfig(defaultConfig.children[length1-1])// 二级
                for (let k = 0; k < 10; k++) {
                    if (Math.random() > 0.6) {
                        const length2 = defaultConfig.children[length1 - 1].children.length
                        addConfig(defaultConfig.children[length1 - 1].children[length2-1])// 三级
                    }
                }
            }
        }
    }
}

function addConfig(parent,child){
    if(child){
        parent?.children?.push({
            ...configTemplate,
            ...child
        });
    }else{
        parent?.children?.push({
            ...configTemplate,
            used_num:parseInt(Math.random()*10),
            id:`${parent?.children?.length+1}`,
            materialId:parseInt(Math.random()*50+1230),
            children:[]
        })
    }
}

export default {
    'get /api/config/materialBOM':(req,res)=>{
        res.status(200)
        res.send({
            data:defaultConfig,
            success:true
        })
    },

    'post /api/config/materialBOM/del':(req,res)=>{
        // 传入带有阶层信息的id列表 如["1-1-2","1-1"]
        const {idList} = req.body
        console.log(idList)
        if(idList instanceof Array){
            idList.map((tempId)=>{
                let id=tempId.split("-")
                let parent=defaultConfig
                for(let level=0;level<id.length;level+=1){
                    const index=parent?.children?.findIndex((config)=>{
                        return config.id===id[level]
                    })
                    if(index!==-1){
                        if(level+1===id.length){
                            parent?.children?.splice(index,1)
                            return
                        }else{
                            parent = parent?.children[index]
                        }
                    }
                }
                return null;
            })
        }
        res.status(200)
        res.send({
            data:defaultConfig,
            success:true
        })
    },

    'post /api/config/materialBOM/edit':(req,res)=>{
        try{
            const { newConfig } = req.body
            let { id } = newConfig
            id = `${id}`.split("-")
            let parent = defaultConfig
            let indexList=[]
            for (let level = 0; level < id.length; level += 1) {
                const index = parent?.children?.findIndex((config) => {
                    return `${config.id}` === `${id[level]}`
                })
                indexList.push(index)
                if (index !== -1) {
                    parent = parent.children[index]
                    // 如果到达了最后一层，编辑
                    if (level + 1 === id.length) {
                        if (`${newConfig.used_num}` !== `${parent.used_num}`){

                            for(let field in newConfig){
                                if(field!=="id"){
                                    parent[field] = newConfig[field]
                                }
                            }
                        }
                    }
                } else {
                    addConfig(parent, {
                        ...newConfig,
                        id: id[level]
                    })
                    break;
                }
            }
            res.status(200)
            res.send({
                data: defaultConfig,
                success: true
            })
        }catch(e){
            console.error(e)
            res.status(500)
            res.send({
                data: defaultConfig,
                success: false
            })
        }
    }
}