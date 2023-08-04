<template>
    <div class="header" @click="toggle">
        <el-icon-expand v-if="props.collapse"></el-icon-expand>
        <el-icon-fold v-else></el-icon-fold>
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
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
}

svg {
    width: 1em;
    height: 1em;
}
</style>