<template>
    <div class="header" @click="toggle">
        <el-button type="primary" v-if="props.collapse">展开</el-button>
        <el-button type="primary" v-else>折叠</el-button>
    </div>
</template>

<script setup lang="ts">
let props = defineProps<{
    collapse: boolean
}>()
let emits = defineEmits(['update:collapse'])
const toggle = function () {
    emits('update:collapse', !props.collapse)
}

</script>

<style scoped lang="scss">
.header {
    height: 70px;
    padding: 0 20px;
    display: flex;
    align-items: center;
}
</style>