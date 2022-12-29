<template>
<div style="display: flex;flex-wrap: wrap;text-align: center">
    <div  v-for="item in all" style="width: 100px;height: 100px;">
        <div><Icon :name="item" :size="30" /></div>
        <div>{{item}}</div>
    </div>
</div>
</template>
<script setup lang="ts">
import {all} from "@/helper/icon"
</script>


