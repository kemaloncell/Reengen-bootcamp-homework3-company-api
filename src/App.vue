<template>
  <v-app>
    <v-main>
      <v-app-bar color="dark lighten-1" dense dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>Alpha</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-main>
    <v-main class="m-0 p-0" no-gutters style="margin-bottom: 350px">
      <v-container class="m-0 p-0" fluid no-gutters>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    items: ['Guest', 'Admin'],
  }),
};
</script>
