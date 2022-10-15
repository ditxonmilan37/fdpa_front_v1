<template>
  <div>
    <v-navigation-drawer v-model="$store.state.__drawer" app>
      <v-list-item dark>
        <img class="__img_logo" src="@/assets/img/logo-white.png" alt="" />
      </v-list-item>

      <v-divider dark></v-divider>

      <v-list shaped dark dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" dark elevation="0">
            Salir del sistema
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
name: "navigation-drawer-comp";
export default {
  data() {
    return {
      items: [
        { title: "Incio", icon: "mdi-home", link: "/home" },
        { title: "Personal", icon: "mdi-account-multiple" },
        { title: "Eventos", icon: "mdi-calendar", link: "/events/main" },
        {
          title: "Control de Pruebas",
          icon: "mdi-timer",
          link: "/test/main",
        },
      ],
      right: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background-color: #15182f !important;
}

.__title_main {
  font-size: 12px;
  font-weight: 500;
}

.__img_logo {
  max-width: 100%;
}
</style>