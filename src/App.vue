<template>
  <v-app>
    <v-navigation-drawer
      persistent="false"
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          light
          router
          :to="item.to"
          :key="i"
          value="true"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      absolute
      :clipped-left="clipped"
      scroll-off-screen
      scroll-target="#scrolling-techniques"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div id="scrolling-techniques">
        <router-view/>
      </div>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          {icon: 'calendar_today', title: 'Установка даты', to: '/'},
          {icon: 'cloud_upload', title: 'Загрузка excel для паспорта', to: '/upload'},
          {icon: 'test', title: 'test', to: '/eco-lab-edit'}],
        miniVariant: false,
        right: true,
        title: 'ЦРМПиООС'
      }
    },
    name: 'ЦРМПиООС'
  }
</script>
