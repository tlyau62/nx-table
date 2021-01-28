<script>
import { Fragment } from "vue-fragment";

export default {
  name: "VDatatableCell",
  props: ["context", "scope", "cellData"],
  components: {
    Fragment,
    Vnodes: {
      functional: true,
      render(h, ctx) {
        if (!ctx.props.vnodes) {
          return;
        }

        const vnodes = ctx.props.vnodes;

        return vnodes.length > 1 ? <fragment>{vnodes}</fragment> : vnodes;
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
