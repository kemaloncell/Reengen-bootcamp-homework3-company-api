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

          <v-list class="list-item">
            <v-list-item>
              <v-list-item-title @click="goHomePage()">Home</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="goAdminPage()">Admin</v-list-item-title>
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
  data() {
    return {
      chooseUser: 'User',
      chooseAdmin: 'Admin',
    };
  },

  methods: {
    goHomePage() {
      this.$router.push({ name: 'Home' });
      this.$store.state.onlineUser = this.chooseUser;
    },
    goAdminPage() {
      this.$router.push({ name: 'Admin' });
      this.$store.state.onlineUser = this.chooseAdmin;
    },
  },
};
</script>

<style scoped>
.list-item {
  cursor: pointer;
}
</style>
