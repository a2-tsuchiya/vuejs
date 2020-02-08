<template>
<div>
    <Header :level="2">Render関数を理解する</Header>
</div>
</template>
<script>
import Header from './components/Header';
export default {
    name: 'test',
    components: {
        Header
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