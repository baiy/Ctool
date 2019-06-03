<template>
    <Prism :language="lang" :code="code" v-if="code"></Prism>
</template>
<script>
    import Prism from 'vue-prismjs'
    import 'prismjs/themes/prism.css'

    export default {
        components: {
            Prism
        },
        name: 'codeHighlight',
        props: {
            lang: {
                type: String,
                default: ""
            },
            code: {
                type: String,
                default: ""
            },
        },
    };
</script>
