<template>
    <div class="content-box">
        <div v-draggable class="drag-container flex-center">
            我是可拖拽的元素
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.drag-container {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    font-size: 23px;
    font-weight: bold;
    color: var(--el-color-primary-light-3);
    background: var(--el-color-primary-light-9);
    border-radius: 50%;
}

/* content-box (常用内容盒子) */
.content-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .text {
        margin: 20px 0 30px;
        font-size: 23px;
        font-weight: bold;
        color: var(--el-text-color-regular);
    }
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>