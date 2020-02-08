<template>
<div>
    <h1><slot name="title">Title</slot></h1>
    <p><slot></slot></p>
    <p>Slot:{{slotValue}}</p>
</div>
</template>
<script>
export default {
    computed: {
        slotValue() { return this.$slots; }
    }
}
</script>