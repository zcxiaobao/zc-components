<template>
    <div class="menu-container">
        <div class="flex-1">
            <zc-menu :data="data1"></zc-menu>
        </div>
        <div class="flex-1">
            <zc-infinity-menu :data="infinityData"></zc-infinity-menu>
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


// let data2 = [
//     {
//         name: '导航1',
//         index: '1',
//         icon: 'Document'
//     },
//     {
//         name: '导航2',
//         index: '2',
//         icon: 'Document'
//     },
//     {
//         name: '导航3',
//         index: '3',
//         icon: 'Document',
//         children: [
//             {
//                 name: '导航3-1',
//                 index: '3-1',
//                 icon: 'Document',
//                 children: [
//                     {
//                         name: '导航3-1-1',
//                         index: '3-1-1',
//                         icon: 'Document',
//                         children: [
//                             {
//                                 name: '导航3-1-1-1',
//                                 index: '3-1-1-1',
//                                 icon: 'Document',
//                                 children: [
//                                     {
//                                         name: '导航3-1-1-1-1',
//                                         index: '3-1-1-1-1',
//                                         icon: 'Document',
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ]

let infinityData = [{
    name: '系统管理',
    index: 'sys',
    icon: 'Menu',
    children: [{
        name: '权限管理',
        index: 'permission',
        icon: 'User',
        children: [
            { name: '角色管理', index: 'role', icon: 'User' },
            { name: '资源管理', index: 'res', icon: 'User' }
        ]
    }, {
        name: '字典管理', index: 'dict', icon: 'User'
    }]
}, {
    name: '营销管理', index: '2', icon: 'Menu'
}, {
    name: '测试',
    index: 'test',
    icon: 'Menu',
    children: [{
        name: '测试-1',
        index: 'test-1',
        icon: 'Document',
        children: [{ name: '测试-1-1', index: 'test-1-1', icon: 'Document', children: [{ name: '测试-1-1-1', index: 'test-1-1-1', icon: 'Document' }] }, { name: '测试-1-2', index: 'test-1-2', icon: 'Document' }]
    }]
}]

</script>

<style scoped>
.menu-container {
    display: flex;

}

.flex-1 {
    flex: 1
}
</style>