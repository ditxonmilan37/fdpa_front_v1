<template>
  <div>
    <v-dialog
      v-model="$store.state.__modal_form_serie"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="__card_main" dark>
        <v-card-title primary-title> CREAR SERIE </v-card-title>
        <v-card-text>
          <newFormSerieVue />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import newFormSerieVue from "@/components/serieComponents/newFormSerie.vue";
export default {
  name: "modalFormSerie",
  components: {
    newFormSerieVue,
  },
};
</script>

<style lang="scss" scoped>
.__card_main {
  background-color: #15182f;
}
</style>