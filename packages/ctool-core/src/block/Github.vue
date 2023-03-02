<template>
    <Align class="ctool-github" gap="none">
        <span class="ctool-github-name" @click="openUrl(`https://ctool.dev/`)">
            <Icon name="github" :size="12"/> <strong>Ctool</strong>
        </span>
        <span class="ctool-github-star" v-if="star > 0" @click="openUrl(`https://github.com/baiy/Ctool`)">
            {{ `${star}`.replace(/(\d)(?=(\d{3})+$)/g, "$1,") }}
        </span>
    </Align>
</template>

<script setup lang="ts">
import {onMounted} from "vue"
import axios from "axios";
import storage from "@/helper/storage";
import {openUrl} from "@/helper/helper"

const CACHE_NAME = 'github_star';

let star = $ref(storage.get<number>(CACHE_NAME) || 0)

onMounted(() => {
    if (star === 0) {
        axios({url: 'https://api.github.com/repos/baiy/Ctool'}).then(({data}) => {
            const count = data.stargazers_count ? parseInt(data.stargazers_count) : 0
            if (count > 0) {
                star = count
                storage.setNoVersion(CACHE_NAME, count, 3700)
            }
        }).catch(() => {
        });
    }
})

</script>

<style scoped>
.ctool-github span {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    column-gap: 5px;
    font-size: 12px;
    height: 24px;
    padding: 2px 5px;
    text-decoration: none;
}

.ctool-github span:hover {
    color: var(--ctool-primary-hover);
}

.ctool-github .ctool-github-name {
    border: 1px solid var(--form-element-border-color);
    border-radius: 3px 0 0 3px;
}

.ctool-github .ctool-github-star {
    border: 1px solid var(--form-element-border-color);
    border-left: none;
    font-weight: bold;
    border-radius: 0 3px 3px 0;
}
</style>
