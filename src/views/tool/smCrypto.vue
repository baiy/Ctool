<template>
    <div>11</div>
</template>

<script>
export default {
    name: "smCrypto",
    created () {
        const sm2 = require('sm-crypto').sm2
        console.log(sm2.generateKeyPairHex())
    }
}
</script>

<style scoped>

</style>