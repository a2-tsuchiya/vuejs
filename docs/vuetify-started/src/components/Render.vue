<script>
export default {
    data:() => ({
        message: 'Hello, Render'
    }),
    render: function(createElement) {
        return createElement('h1', this.message)
    }
}
</script>