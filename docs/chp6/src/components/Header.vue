<script>
export default {
    name:'Header',
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    render: function(createElement) {
        return createElement(
            'h' + this.level,
            this.$slots.default
        )
    }
}
</script>