// const express = require('express');
// const router = express.Router()
import express from "express";
const router = express.Router()
import main from "../main.js"

var cache = {}

// 接受汉语
router.get('/searchHan', (req, res) => {
    const engDictionary = main.lib.english.word;
    const chineseDictionary = main.lib.中文;
    let tempTime = Date.now()

    
    let JsonTool = (data)=>{

        let takeTime = Date.now() - tempTime
        console.log("["+takeTime+"ms]完成查询：" + req.query.value);
        res.json({
            ...data,
            takeTime
        })
    }
    let result
    let searchIdiom = () => {
         result = chineseDictionary.四字成语.data.filter((elm) => elm.word.includes(req.query.value));
        JsonTool({
            type: 'idiom',
            result:{
                ...result,
                toEnglish:toEnglish
            },
        });
    }
    let toEnglish = engDictionary.data.filter((elm)=>elm.content.word.content.trans.findIndex((v,i,o)=>{
        return v.tranCn.includes(req.query.value)
    }) != -1)
    switch (req.query.value.length) {
        case 1:
            result = chineseDictionary.字.data.find((elm) => elm.word == req.query.value);
            JsonTool({
                type: 'word',
                result:{
                    ...result,
                    toEnglish:toEnglish
                },
                
            });
            break;

        case 2:
            result = chineseDictionary.词.data.find((elm) => elm.ci == req.query.value);
            JsonTool({
                type: 'ci',
                result:{
                    ...result,
                    toEnglish:toEnglish
                },
            });
            break;

        case 3:
        case 4:
            searchIdiom();
            break;

        default:
            JsonTool({
                type: 'undefined',
            });
            break;
    }

});
router.get('/searchEng', (req, res) => {
    const engDictionary = main.lib.english.word;
    let tempTime = Date.now()

    
    let JsonTool = (data)=>{
        let takeTime = Date.now() - tempTime
        console.log("["+takeTime+"ms]完成查询：" + req.query.value);

        res.json({
            ...data,
            takeTime
        })
    }

    let precisionResult = engDictionary.data.find((elm)=> elm.headWord == req.query.value);
    let blurResult = engDictionary.data.filter((elm)=>elm.headWord.includes(req.query.value))

    JsonTool({
        
        result:{
            ...(precisionResult||blurResult[0]),
            allResults:blurResult
        }
    });

});
export default router