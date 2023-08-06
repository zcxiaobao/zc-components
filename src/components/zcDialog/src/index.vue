<template>
    <div>
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
            <!-- <template #[slotName] v-for="(_, slotName) in $slots">
            <slot :name="slotName" />
        </template> -->
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { ZcDialogProps } from './types';

const $attrs = useAttrs()


const props = withDefaults(defineProps<ZcDialogProps>(), {
    isScroll: false,
    isDrag: false,
    scrollHeight: 400
})
</script>

<style scoped></style>



