export default {
    fitContent
}

function fitContent(val) {
    let template = []

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
    return template
}