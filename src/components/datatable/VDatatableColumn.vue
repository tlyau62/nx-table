<template>
  <div class="datatable-column"></div>
</template>

<script>
export default {
  name: "VDatatableColumn",
  props: ["title", "data", "width"],
  created() {
    debugger;
    this.$parent.$emit("column-created", {
      title: this.title,
      data: this.data,
      width: this.width || "",
    });
  },
};
</script>

<style lang="scss" scoped>
.datatable-column {
}
</style>