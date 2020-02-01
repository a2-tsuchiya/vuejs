<template>
    <div>
        <Slot>
            <template #title>Vue.js</template>
            I'd like to know about $vm.slots;
        </Slot>
    </div>
</template>

<script>
import Slot from './components/Slot'
export default {
    name: 'test',
    components: {
        Slot,
    },
}
</script>