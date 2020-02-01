<template>
<ul>
    <template v-for="todo in todos">
        <slot :todo="todo">
            <li :key="todo.id">{{ todo.text }}</li>
        </slot>
    </template>
</ul>
</template>

<script>
export default {
    name: 'todo-list',
    props: {
        todos: {
            type: Array,
            required: true,
        }
    }
}
</script>