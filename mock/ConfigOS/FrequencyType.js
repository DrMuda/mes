let frequencyTypeTemplate={
    type: '',
    name: '新的生产班次',
    timeSlotByTime: [],
    timeSlotList: []
}
let frequencyTypeList = [
	{
		type: '1',
		name: '正常生产班次',
		timeSlotByTime: ['8:00-16:00', '16:00-24:00', '0:00-8:00'],
		timeSlotList: ['早', '午', '晚'],
	},
	{
		type: '2',
		name: '赶工生产班次',
		timeSlotByTime: ['8:00-14:00', '14:00-20:00', '20:00-2:00', '2:00-8:00'],
		timeSlotList: ['早', '午', '晚', '夜'],
	}
];

export default{
    //获取班次模式列表
    'get /api/config/frequencyType':(req,res)=>{
        res.status(200)
        res.send({
            data:frequencyTypeList,
            success: true
        })
    },
    //删除班次模式
    'post /api/config/frequencyType/del':(req,res)=>{
        let {type}=req.body
        frequencyTypeList=frequencyTypeList.filter((frequencyType)=>{
            return frequencyType.type!==type
        })
        res.status(200)
        res.send({
            data:frequencyTypeList,
            success: true
        })
    },
    //增加或编辑班次模式
    'post /api/config/frequencyType/edit':(req,res)=>{
        try{
            let {newFrequencyType}=req.body
            let index=frequencyTypeList.findIndex((frequencyType)=>{
                return frequencyType.type==newFrequencyType.type
            })
            if(index!=-1){
                frequencyTypeList[index]={...frequencyTypeList[index],...newFrequencyType} 
            }else{
                frequencyTypeList.push({
                    ...frequencyTypeTemplate,
                    ...newFrequencyType,
                    type:frequencyTypeList.length+1+""
                })
            }
            res.status(200)
            res.send({
                data:frequencyTypeList,
                success: true
            })
        }catch(e){
            console.error(e)
        }
    },

}