<script>
export default {
  name: "VDatatableCell",
  props: ["component", "scope"],
  render(h) {
    return this.component.$scopedSlots.default(this.scope);
  },
};
</script>