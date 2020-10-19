import { data } from './datatable.utility';

export default {
  props: {
    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },
  },
  beforeMount() {
    this.config.select = this.select;
  },
  watch: {
    table(table) {
      if (this.select) {
        table.on('select', (e, dt, type, indexes) => {
          const evt = { e, dt, type, indexes, selected: [] };

          if (type === 'row') {
            const selected = table.rows({ selected: true });

            evt.selected = data(selected.data());
            evt.indexes = data(selected.indexes());
          } else {
            throw new Error('Select non-row is not supported yet.');
          }

          this.$emit('select', evt);
        });
      }
    }
  }
};
