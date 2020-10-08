<script>
export default {
  name: "VDatatableCell",
  props: ["context", "scope", "cellData"],
  render(h) {
    const defaultSlot = this.context.$scopedSlots.default;

    if (defaultSlot) {
      return defaultSlot(this.scope);
    } else {
      return this._v(this.cellData);
    }
  },
};
</script>