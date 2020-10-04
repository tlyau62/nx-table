import datatableService from './datatable.service';
import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';

export default {
  created() {
    this.componentStore = [];
  },
  beforeMount() {
    this.config.columns = helper.processColumns(this.componentStore, this.config.columns);
  },
  methods: {
    $cleanComponentStore() {
      for (const component of this.componentStore) {
        component.$destroy();
      }
      this.componentStore = [];
    }
  }
};

const helper = {
  /**
   * Impure
   */
  createComponent(componentStore, componentFactory) {
    if (!componentFactory) {
      return () => { };
    }

    return function (cell, cellData, rowData, rowIndex, colIndex) {
      const Component = Vue.extend(componentFactory);

      const instance = new Component({
        propsData: {
          cellData,
          rowData,
          rowIndex,
          colIndex,
          datatable: this.DataTable(),
        },
      });

      componentStore.push(instance);

      $(cell).empty();

      cell.appendChild(instance.$mount().$el);
    };
  },

  processColumns(componentStore, columns) {
    return (
      datatableService.addCreatedCell(columns, (col) =>
        helper.createComponent(componentStore, col.component)
      ) || []
    );
  },
};

