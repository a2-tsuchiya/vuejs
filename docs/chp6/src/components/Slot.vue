<template>
    <div>
        <slot name="activator" v-bind:on="on"></slot>
        <slot v-if="display"></slot>
    </div>
</template>
<script>
export default {
    data:() =>({
        user: {
            firstName:'John',
            lastName:'Doe',
            age:'25',
            sex:'femaile'
        },
        message:'Hello, Scoped Slot',
        display:true,
    }),
    methods: {
        on() {
            return this.display = !this.display;
        }
    }
}
</script>