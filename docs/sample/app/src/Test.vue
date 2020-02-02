<template>
<div>
    <BlogPost>
        <template #title>vue.js</template>
        I'd like to know about $vm.slots.
    </BlogPost>
</div>
</template>
<script>
import BlogPost from './components/User';
export default {
    name: 'test',
    components: {
        BlogPost
    }
}

// import Table from './components/Table'
// export default {
//     name: 'test',
//     components: {
//         Table,
//     },
//     data() {
//         return {
//             // header:['ID', 'FIRSTNAME', 'LASTNAME', 'EMAIL'],
//             header:['ID', 'NAME', 'EMAIL'],
//             items: [
//                 {
//                     id:1,
//                     firstName:'John',
//                     lastName:'Doe',
//                     email:'john@example.com'
//                 },
//                 {
//                     id:2,
//                     firstName:'Kevin',
//                     lastName:'Wood',
//                     email:'kevin@example.com'
//                 },
//                 {
//                     id:3,
//                     firstName:'Harry',
//                     lastName:'Bosch',
//                     email:'harry@test.com'
//                 }
//             ]
//         }
//     }
// }
</script>