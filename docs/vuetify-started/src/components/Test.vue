<template>
<v-app>
    <v-card>    
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-text-field prepend-icon="mdi-database-search" label="キーワードで探す" v-model="keyword"/>
                </v-col>
                <v-col cols="4">
                    <v-select
                        :items="categorys"
                        item-text="name"
                        item-value="index"
                        label="カテゴリから探す"
                        v-model="category"
                        prepend-icon="mdi-file-search-outline"
                        attach
                        clearable
                    ></v-select>
                </v-col>                
            </v-row>
            <v-row justify="space-between">
                <v-col cols="auto" v-for="book in filterBooks" :key="book.index">
                    <v-card outlined :href="book.link">
                        <v-img height="180" width="128" :src=book.url :href="book.link">
                            <!-- <template v-slot:placeholder>
                                <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                >
                                    <v-progress-circular indeterminate color="blue lighten-2"></v-progress-circular>
                                </v-row>
                            </template> -->
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</v-app>
</template>

<script>
export default {
    data:() => ({
        keyword:'',
        category:'',
        link:'https://h2zqr.cybozu.com/k/1255/show#record='
    }),
    props: ['books', 'categorys'],
    computed: {
        filterBooks() {
            const books = this.books;
            if(this.category == undefined) return this.books;
            return books.filter(book => {
                return book.category.indexOf(this.category) !== -1 && book.name.indexOf(this.keyword) !== -1
            })
        },
    },
    watch: {
        category(value) { this.filterBooks; }
    }
}
</script>