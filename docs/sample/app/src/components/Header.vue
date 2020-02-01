<script>
export default {
    name: 'Header',
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    render: function(el) {
        return el(
            'h' + this.level,
            this.$slots.default
        )
    },
}
</script>