export default function strToJson(list){
    //JSON对象数组格式的字符串转换为JSON对象数组
    //"[{},{},{}]"=>[{},{},{}]
    try{
        list='{"data":'+list+'}'
        list=JSON.parse(list);
        list=list.data;
        return list;
    }catch(e){
        console.error(e);
        return []
    }
}