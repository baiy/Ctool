import {isUtools} from '../helper'
// 剪贴板操作
export const copy = (data,successCallback)=>{
    document.querySelector(
        '#clipboard').innerHTML = '<textarea id="clipboard-text"></textarea>'
    document.querySelector('#clipboard-text').value = data
    document.querySelector('#clipboard-text').select()
    if (document.execCommand('copy')) {
        successCallback && successCallback()
    }
    document.querySelector('#clipboard').innerHTML = ''
}

export const paste = ()=>{
    document.querySelector('#clipboard').innerHTML = '<textarea id="clipboard-text"></textarea>'
    document.querySelector('#clipboard-text').select()
    document.execCommand('paste')
    let r = document.querySelector('#clipboard-text').value || document.querySelector('#clipboard-text').innerHTML
    document.querySelector('#clipboard').innerHTML = ''
    return r ? r : ''
}

export const copyImage = (imageBase64,successCallback = "")=>{
    if (isUtools && imageBase64){
        window.utools.copyImage(imageBase64)
        successCallback && successCallback()
    }
}

export default {
    copy,
    paste,
    copyImage
}
