<template>
  <div class="datatable-column"></div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";

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
  data() {
    return {
      name: uuidv4(),
    };
  },
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
      name: this.name,
    });
  },
  watch: {
    title(title) {
      if (this.$parent.table) {
        const header = this.$parent.table.column(`${this.name}:name`).header();

        $(header).text(title);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.datatable-column {
}
</style>
