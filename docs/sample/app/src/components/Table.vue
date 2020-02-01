<template>
    <table border="1">
        <thead>
            <tr>
                <th v-for="row_name in header" :key="row_name">{{ row_name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <slot v-bind:item="item">
                    <td v-for="(value, index) in item" :key="index">{{ value }}</td>
                </slot>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        header: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
        }        
    },
}
</script>