<template>
  <div>
    <v-dialog
      persistent
      max-width="600"
      :retain-focus="false"
      v-model="$store.state.__modal_new_events"
    >
      <v-card class="__main_card_event" dark>
        <v-card-title> Nuevo Evento </v-card-title>
        <v-card-text>
          <form-new-events-vue></form-new-events-vue>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import formNewEventsVue from "@/components/eventsComponents/formNewEvents.vue";
export default {
  name: "modalFormNewEvent",

  components: {
    formNewEventsVue,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.__main_card_event {
  background-color: #15182f !important;
}
</style>