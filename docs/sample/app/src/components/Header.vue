<template>
<div>
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-if="level === 2">
        <slot></slot>
    </h2>    
</div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    // render: function(createElement) {
    //     return createElement(
    //         'h' + this.level,
    //         this.$slots.default
    //     )
    // },
}
</script>