<script>
export default {
  name: "VDatatableCell",
  props: ["context", "scope", "cellData"],
  components: {
    Vnodes: {
      functional: true,
      render(h, ctx) {
        const vnodes = ctx.props.vnodes;

        return vnodes.length > 1 ? <span>{vnodes}</span> : vnodes;
      },
    },
  },
  render(h) {
    const defaultSlot = this.context.$scopedSlots.default;

    // intentionally put here to trigger reaction
    this.context.$attrs && this.context.$listeners;

    if (defaultSlot) {
      const vnodes = defaultSlot(this.scope);

      return <Vnodes vnodes={vnodes}></Vnodes>;
    } else {
      return this._v(this.cellData || "");
    }
  },
};
</script>