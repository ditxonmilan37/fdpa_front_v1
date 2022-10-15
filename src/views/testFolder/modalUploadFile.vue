<template>
  <div>
    <v-dialog
      max-width="1000"
      :fullscreen="onDevice"
      persistent
      v-model="$store.state.__modal_test_upload_file"
      v-if="$store.state.__modal_test_upload_file"
    >
      <uploadFileVue />
    </v-dialog>
  </div>
</template>

<script>
import uploadFileVue from "@/components/testComponents/uploadFile.vue";
export default {
  name: "modalUploadFile",
  data() {
    return {
      onDevice: false,
    };
  },
  components: {
    uploadFileVue,
  },
  mounted() {
    this.modoDevice();
  },
  methods: {
    modoDevice() {
      if (screen.width < 800) {
        this.onDevice = true;
      } else {
        this.onDevice = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>