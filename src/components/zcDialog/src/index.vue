<template>
    <div v-dialog-drag="props.isDrag">
        <el-dialog v-bind='$attrs'>
            <el-scrollbar :max-height="props.isScroll ? props.scrollHeight : 100000">
                <template #default>
                    <slot name="default" />
                </template>
            </el-scrollbar>

            <template #header>
                <slot name="header" />
            </template>
            <template #footer>
                <slot name="footer" />
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { ZcDialogProps } from './types';
import vDialogDrag from './dialogdrag.ts'
const $attrs = useAttrs()


const props = withDefaults(defineProps<ZcDialogProps>(), {
    isScroll: false,
    isDrag: false,
    scrollHeight: 400
})
</script>

<style scoped></style>



