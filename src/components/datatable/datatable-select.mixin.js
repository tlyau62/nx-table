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
        if (!this.isSameArray(selected, this.currentSelect)) {
          this.setSelectRows(selected);
        }
      }
    }
  },
  methods: {
    setSelectRows(selected) {
      const indexes = selected.map(s => this.rows.findIndex(r => r === s));

      this.table.rows().deselect();
      this.table.rows(indexes).select();
    },
    getSelectedRow() {
      return data(this.table.rows({ selected: true }).data());
    },
    isSameArray(arr1, arr2) {
      arr1 = _.clone(arr1);
      arr2 = _.clone(arr2);
      const equal = _.isEqual(arr1.sort(), arr2.sort());

      return equal;
    }
  }
};
