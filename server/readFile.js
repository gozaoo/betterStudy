export default {
    load,
    reload
}

// import { readFile, readFileSync } from 'fs'
// var slog = require('single-line-log').stdout;

import { stdout } from "single-line-log";

let libs = {
    中文: {
        词: {
            path: './lib/chinese/ci.js',
            data: undefined
        },
        四字成语: {
            path: './lib/chinese/idiom.js',
            data: undefined
        },
        字: {
            path: './lib/chinese/word.js',
            data: undefined
        },
        歇后语: {
            path: './lib/chinese/xiehouyu.js',
            data: undefined
        }
    },
    english:{
        word: {
            path: './lib/english/word.js',
            data: undefined
        }
    }
}

async function load() {
    let error = []

    stdout('正在加载资料库')
    const sll = await import('single-line-log').st;

    for(let parentIndex in libs){
        for(let childIndex in libs[parentIndex]){
            const lib = libs[parentIndex][childIndex]

            await import(lib.path).then(datas=>{

                libs[parentIndex][childIndex]['data'] = datas.default
                stdout('加载' + [parentIndex] + ' ' +[childIndex]+ '成功');
            })
        }
    }
    stdout('加载资料库完毕\n')

    return (error.length > 0)?error:libs
}

function reload(){

}