<template>
  <div>
    <h2 class="content-title">{{ content.label }}</h2>
    <component :is="targenComp"></component>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "MainContent",
  props: {
    content: {
      type: Object,
      default() {
        return {
          label: "test",
          path: "test",
          index: "test",
        };
      },
    },
  },
  data() {
    return {
      targenComp: null,
    };
  },
  watch: {
    content: {
      deep: true,
      handler: function (newValue) {
        console.log(newValue, "11");
        this.targenComp = defineAsyncComponent(() =>
          import(`@/components/${newValue.path}/${newValue.index}`)
        );
      },
    },
  },
};
</script>

<style></style>
