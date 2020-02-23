<template>
    <v-app>
        <v-container fluid>
            <v-row justify="space-between">
                <v-col>
                    <v-autocomplete
                        v-model="user"
                        :items="filterTypes"
                        item-text="name"
                        item-value="code"
                        label="Search user, organization, or group"
                        prepend-icon="search"
                        attach
                        clearable
                    ></v-autocomplete>
                </v-col>
                <v-col>
                    <v-switch v-model="types" :label="`user`" value="user"></v-switch>
                </v-col>
                <v-col>
                    <v-switch v-model="types" :label="`organization`" value="organization"></v-switch>
                </v-col>
                <v-col>
                    <v-switch v-model="types" :label="`group`" value="group"></v-switch>
                </v-col>
            </v-row>
        </v-container>

        <v-data-table
            :headers="headers"
            :items="filterUsers"
            :items-per-page="15"
            class="elevation-1"
            fixed-header
        >
            <template v-slot:item.viewable="{item}">
                <v-simple-checkbox v-model="item.viewable" disabled></v-simple-checkbox>
            </template>
            <template v-slot:item.editable="{item}">
                <v-simple-checkbox v-model="item.editable"></v-simple-checkbox>
            </template>
            <template v-slot:item.addable="{item}">
                <v-simple-checkbox v-model="item.addable"></v-simple-checkbox>
            </template>
            <template v-slot:item.deletable="{item}">
                <v-simple-checkbox v-model="item.deletable"></v-simple-checkbox>
            </template>
            <template v-slot:item.appEditable="{item}">
                <v-simple-checkbox v-model="item.appEditable"></v-simple-checkbox>
            </template>
            <template v-slot:item.importable="{item}">
                <v-simple-checkbox v-model="item.importable"></v-simple-checkbox>
            </template>
            <template v-slot:item.exportable="{item}">
                <v-simple-checkbox v-model="item.exportable"></v-simple-checkbox>
            </template>                                                                                            
            <template v-slot:item.includeSubs="{item}">
                <v-simple-checkbox v-model="item.includeSubs"></v-simple-checkbox>
            </template>
        </v-data-table>
    </v-app>
</template>
<script>
export default {
    props: ['aclsByUser', 'users'],
    data:() => ({
        user:null,
        types:['user', 'organization', 'group'],
        headers:[
            { text:'AppId', value:'appId', align:'left' },
            { text:'AppName', value:'appName' },
            { text:'Viewable', value:'viewable' },
            { text:'Addable', value:'addable' },
            { text:'Editable', value:'editable' },
            { text:'Deletable', value:'deletable' },
            { text:'AppEditable', value:'appEditable' },
            { text:'Importable', value:'importable' },
            { text:'Exportable', value:'exportable' },
            { text:'IncludeSubs', value:'includeSubs' }
        ],      
    }),
    computed: {
        filterUsers() {
            const aclsByUser = this.aclsByUser;
            return aclsByUser[this.user];
        },
        filterTypes() {
            const users = this.users;
            return users.filter(user => {
                return this.types.find(type => type === user.type)
            })
        }
    },
}
</script>