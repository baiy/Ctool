<template>
  <HeightResize v-slot="{height}" ignore :reduce="5">
    <Align direction="vertical">
      <div v-row="`1-1`">
            <Textarea placeholder="输入"
                      :height="height" v-model="action.current.input"></Textarea>
        <div>
          <Input label=" base" :model-value="result.base"></Input>
          <Input label="path" :model-value="result.path"></Input>
          <Input label="query" :model-value="result.query"></Input>
          <div v-for="x in result.paramList">
            <Input :label="x.paramName" :model-value="x.paramValue"></Input>
          </div>
        </div>
      </div>
    </Align>
  </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";


const action = useAction(await initialize({input: ""}))

class Param {
  paramName: string = ''
  paramValue: string = ''
}

const result = $computed(() => {
  let r = {
    base: '',
    path: '',
    query: '',
    paramList: [] as Param[]
  }
  if (!action.current.input) {
    return r;
  }
  let input = action.current.input
  // 查找协议的开始点
  let protocolStart = input.indexOf("://");
  // 查找协议之后的第一个斜杠
  let baseEnd = input.indexOf("/", protocolStart + 3);
  if (baseEnd === -1) {
    baseEnd = input.length;
  }
  // 截取协议结束位置之前的字符串
  r.base = input.substring(0, baseEnd);
  // 截取第一个/到第一个问号之前的字符串
  let pathEnd = input.indexOf("?", baseEnd);
  if (pathEnd === -1) {
    pathEnd = input.length;
  }
  r.path = input.substring(baseEnd + 1, pathEnd);
  // 解析问号后的内容
  if (pathEnd !== -1 && pathEnd <= input.length) {
    r.query = input.substring(pathEnd + 1);
    // 对参数部分进行解析
    let paramStrList = r.query.split('&', -1);
    r.paramList = paramStrList.map((x) => {
      // 查找第一个等号的位置
      let equalIndex = x.indexOf('=');
      if (equalIndex === -1) {
        return {paramName: x, paramValue: ''}
      } else {
        let paramName = x.substring(0, equalIndex);
        let paramValue = x.substring(equalIndex + 1);
        return {paramName: paramName, paramValue: paramValue}
      }
    });
  }
  // 保存记录
  action.save()
  return r
})

</script>
