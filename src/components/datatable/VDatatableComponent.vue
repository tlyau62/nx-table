<template>
  <span>
    <component :is="tableComponent" v-bind="props"></component>
  </span>
</template>

<script>
export default {
  props: ["tableComponent", "propsFactory", "extraPropData"],
  computed: {
    props() {
      return {
        ...this.extraPropData,
        ...this.propsFactory(),
      };
    },
  },
  methods: {
    log() {
      console.log(this.props);
    },
  },
};
</script>