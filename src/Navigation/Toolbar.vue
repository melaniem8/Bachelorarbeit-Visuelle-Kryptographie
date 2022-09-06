<template>
    <nav>
      <v-navigation-drawer
          v-model="drawer"
          app
          clipped
      >
        <v-list>
          <v-list-item v-for="site in sites" :key="site.title" :to="site.path" link>
            <v-list-item-content>
              <v-list-item-title>{{ site.title }}</v-list-item-title>
            </v-list-item-content>
            <router-link :to="site.path"></router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
          app
          clipped-left
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <router-link to="/" tag="v-toolbar-title" style="cursor: pointer;">{{ title }}</router-link>
      </v-app-bar>
    </nav>
</template>

<script>
export default {
  name: 'ToolBar',
  data: function () {
    return {
      drawer: true,
      title: 'Visuelle Kryptographie',
      path: '/',
      sites: [
        {title: 'Klassische Verschlüsselung', path: '/classicEncryption'},
        {title: 'One Time Pad Verschlüsselung', path: '/oneTimePadEncryption'}
      ]
    }
  }
}
</script>

<style></style>