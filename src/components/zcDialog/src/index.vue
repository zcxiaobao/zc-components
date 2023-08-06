<template>
    <el-dialog v-bind='$attrs' v-model="visible">
        <template #[slotName] v-for="(_, slotName) in $slots">
            <slot :name="slotName" />
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { useSlots, ref } from 'vue';

const $slots = useSlots()
for (let k in $slots) {
    console.log(k)
}
defineProps<{
    isScroll: {
        type: Boolean,
        default: false
    },
    isDrag: {
        type: Boolean,
        default: false
    }
}>()
let visible = ref(true)
</script>

<style scoped></style>



