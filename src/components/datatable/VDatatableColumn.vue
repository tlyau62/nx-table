<template>
  <div class="datatable-column"></div>
</template>

<script>
export default {
  name: "VDatatableColumn",
  props: [
    "title",
    "data",
    "width",
    "defaultContent",
    "orderable",
    "className",
    "visible",
  ],
  beforeMount() {
    this.$parent.$emit("column-created", {
      title: this.title,
      data: this.data,
      width: this.width || "",
      context: this,
      defaultContent: this.defaultContent,
      orderable: this.orderable,
      className: this.className,
      visible: this.visible,
    });
  },
};
</script>

<style lang="scss" scoped>
.datatable-column {
}
</style>