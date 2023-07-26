export default {
    fitContent
}

function fitContent(val) {
    let template = []

    // 检测中文
    var isZh = /^\+?[^\x00-\xff]*$/g
    if(isZh.test(val)){
        template.push('chinese')
    }

    return template
}