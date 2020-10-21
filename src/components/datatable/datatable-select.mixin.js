import { data } from './datatable.utility';
import _ from 'lodash';

export default {
  props: {
    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },

    selected: {
      type: [Array],
      default: () => []
    }
  },
  beforeMount() {
    this.config.select = _.clone(this.select);
  },
  created() {
    this.currentSelect = [];
  },
  watch: {
    table(table) {
      if (this.select) {
        table.on('select', () => this.$emit('update:selected', this.currentSelect = this.getSelectedRow()));
        table.on('deselect', () => this.$emit('update:selected', this.currentSelect = this.getSelectedRow()));

        this.setSelectRows(this.selected);
      }
    },
    selected(selected) {
      if (this.select) {
        if (selected !== this.currentSelect) {
          this.setSelectRows(selected);
        }
      }
    }
  },
  methods: {
    setSelectRows(selected) {
      const indexes = selected.map(s => this.rows.findIndex(r => r === s));

      this.table.rows({ selected: true }).deselect();
      this.table.rows(indexes).select();
    },
    getSelectedRow() {
      return data(this.table.rows({ selected: true }).data());
    },
  }
};
