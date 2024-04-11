
export default {
    fitContent
}
import { evaluate } from 'mathjs'
const math = { evaluate }

function fitContent(val) {
    let template = []

    if(val[0]=='/'||val[0]=='、') return minApp(val)
 
    // 检测中文
    let isZh = /^\+?[^\x00-\xff]*$/g
    if(isZh.test(val)){
        template.push('chinese')
    }

    // 检测英文
    let isEng = /[a-z]+/gi
    if(isEng.test(val)){
        template.push('english')
    }

    // 检测数学
    try {
        let result = math.evaluate(val)
        template.push('math')
    } catch (error) {
        // console.log(error);
    }
    return template
}
function minApp(val){
    var patt = /\/[A-za-z]+/g
    let content = patt.exec(val)

    let isTheContent = (destination)=>{
        if(content&&content[0].slice(1,content[0].length) == destination) return {
            type: 'miniApp',
            destination: destination, 
            info: val.slice(content[0].length,val.length).trim()
        }
        return undefined
    }

    let apps = ['sydy','tran']

    for (let index = 0; index < apps.length; index++) {
        const element = isTheContent(apps[index]);
        if(element != undefined) return element
    }
    
    return {
        type: 'miniApp',
        destination: 'bing',
        info: val.slice(1,val.length)
    }
}