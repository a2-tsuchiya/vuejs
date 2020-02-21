<template>
  <v-app>
    <v-select :items="items"></v-select>
  </v-app>
</template>
<script>
export default {
  data:() => ({
    items:['Foo', 'Bar', 'Bizz'],
  })
}
</script>