import { data } from './datatable.utility';
import { curry, clone } from 'lodash';

export default {
  props: {
    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      selected: []
    }
  },
  beforeMount() {
    this.config.select = this.select;
  },
  watch: {
    table(table) {
      if (this.select) {
        const tableSelect = helper.select(table);
        const tableDeselect = helper.deselect(table);

        table.on('select', (e, dt, type, indexes) => this.$emit('select', tableSelect({ e, dt, type, indexes })));
        table.on('deselect', (e, dt, type, indexes) => this.$emit('deselect', tableDeselect({ e, dt, type, indexes })));
      }
    }
  }
};

const helper = {
  select: curry((table, evt) => {
    const newEvt = { ...evt };
    const selected = table.rows({ selected: true });

    newEvt.selected = data(selected.data());
    newEvt.indexes = data(selected.indexes())

    return newEvt;
  }),
  deselect: curry((table, evt) => {
    const newEvt = { ...evt };
    const selected = helper.select(table, evt);
    const deselected = table.rows(newEvt.indexes);

    newEvt.deselected = data(deselected.data());
    newEvt.selected = selected.selected;

    return newEvt;
  })
};