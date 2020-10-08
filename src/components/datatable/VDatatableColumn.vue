<template>
  <div class="datatable-column"></div>
</template>

<script>
export default {
  name: "VDatatableColumn",
  props: ["title", "data", "width", "defaultContent"],
  mounted() {
    this.$parent.$emit("column-created", {
      title: this.title,
      data: this.data,
      width: this.width || "",
      component: this,
      defaultContent: this.defaultContent,
    });
  },
};
</script>

<style lang="scss" scoped>
.datatable-column {
}
</style>