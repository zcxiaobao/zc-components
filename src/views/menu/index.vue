<template>
    <div class="menu-container">
        <div class="flex-1">
            <zc-menu :data="data1"></zc-menu>
        </div>
        <div class="flex-1">
            <zc-infinity-menu :data="data2"></zc-infinity-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
let data1 = [
    {
        name: '导航1',
        index: '1',
        icon: 'Document'
    },
    {
        name: '导航2',
        index: '2',
        icon: 'Document'
    },
    {
        name: '导航3',
        index: '3',
        icon: 'Document',
        children: [
            {
                name: '导航3-1',
                index: '3-1',
                icon: 'Document'
            }
        ]
    }
]


let data2 = [
    {
        name: '导航1',
        index: '1',
        icon: 'Document'
    },
    {
        name: '导航2',
        index: '2',
        icon: 'Document'
    },
    {
        name: '导航3',
        index: '3',
        icon: 'Document',
        children: [
            {
                name: '导航3-1',
                index: '3-1',
                icon: 'Document',
                children: [
                    {
                        name: '导航3-1-1',
                        index: '3-1-1',
                        icon: 'Document',
                        children: [
                            {
                                name: '导航3-1-1-1',
                                index: '3-1-1-1',
                                icon: 'Document',
                                children: [
                                    {
                                        name: '导航3-1-1-1-1',
                                        index: '3-1-1-1-1',
                                        icon: 'Document',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
</script>

<style scoped>
.menu-container {
    display: flex;

}

.flex-1 {
    flex: 1
}
</style>