<script>
export default {
  name: "VDatatableCell",
  props: ["context", "scope", "cellData"],
  render(h) {
    const defaultSlot = this.context.$scopedSlots.default;

    this.context.$attrs && this.context.$listeners;

    if (defaultSlot) {
      return deepClone(defaultSlot(this.scope), h);
    } else {
      return this._v(this.cellData);
    }
  },
};

// https://stackoverflow.com/questions/51065172/how-can-i-duplicate-slots-within-a-vuejs-render-function
function deepClone(vnodes, createElement) {
  function cloneVNode(vnode) {
    const clonedChildren =
      vnode.children && vnode.children.map((vnode) => cloneVNode(vnode));
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
    cloned.text = vnode.text;
    cloned.isComment = vnode.isComment;
    cloned.componentOptions = vnode.componentOptions;
    cloned.elm = vnode.elm;
    cloned.context = vnode.context;
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    return cloned;
  }
  const clonedVNodes = vnodes.map((vnode) => cloneVNode(vnode));
  return clonedVNodes;
}
</script>