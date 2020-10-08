<script>
export default {
  name: "VDatatableCell",
  props: ["scopedSlots", "scope"],
  render(h) {
    return this.scopedSlots.default(this.scope);
  },
};
</script>