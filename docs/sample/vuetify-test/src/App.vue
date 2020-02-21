<template>
<v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
        <v-container>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item class="title grey--text text--darken-2">
                        Navigatin Lists
                    </v-list-item>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-group
                    v-for="nav_list in nav_lists" :key="nav_list.name" :prepend-icon="nav_list.icon"
                    no-action :append-icon="nav_list.lists ? undefined : ''"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{nav_list.name}}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="list in nav_list.lists" :key="list">
                        <v-list-item-content>
                            <v-list-item-title>{{list}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-container>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app clipped-left>
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Vuetify</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn text>FOR ENTERPRISE</v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{on}">
                    <v-btn v-on="on" text>SUPPORT<v-icon>mdi-menu-down</v-icon></v-btn>
                </template>
                <v-list>
                    <v-subheader>Get help</v-subheader>
                    <v-list-item v-for="support in supports" :key="support.name">
                        <v-list-item-icon>
                            <v-icon>{{support.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{support.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>                   
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </v-app-bar>
    <v-footer color="primary" dark app>
        Vuetify
    </v-footer>
</v-app>
</template>

<script>
export default {
    // data() {
    //     return{ drawer:null }
    // }
    /**return省略形 */
    data:() => ({
        drawer: null,
        supports: [
            
            { name:'Cunsulting and support', icon:'mdi-vuetify' },
            { name:'Dissord community', icon:'mdi-discord' },
            { name:'Report a bug', icon:'mdi-bug' },
            { name:'Github isuu board', icon:'mdi-github-face' },
            { name:'Stack overflow', icon:'mdi-stack-overflow' }
        ],
        nav_lists:[
        {
            name: 'Getting Started',
            icon: 'mdi-speedometer',
            lists:['Quick Start','Pre-made layouts']
        },
        {
            name: 'Customization',
            icon: 'mdi-cogs' 
        },
        {
            name: 'Styles & animations',
            icon: 'mdi-palette',
            lists:['Colors','Content','Display']
        },
        {
            name: 'UI Components',
            icon: 'mdi-view-dashboard',
            lists:['API explorer','Alerts']
        },
        {
            name: 'Directives',
            icon: 'mdi-function'
        },
        {
            name: 'Preminum themes',
            icon: 'mdi-vuetify'
        },
        ]
    })
}
</script>