<template>
  <div class="datatable-column">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VDatatableColumn",
  props: ["title", "data", "width"],
  mounted() {
    this.$parent.$emit("column-created", {
      title: this.title,
      data: this.data,
      width: this.width || "",
      scopedSlots: this.$scopedSlots,
    });
  },
};
</script>

<style lang="scss" scoped>
.datatable-column {
}
</style>