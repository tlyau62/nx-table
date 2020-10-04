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
      let Component, propsData, dummy;

      if (_.isArray(componentFactory)) {
        Component = Vue.extend(componentFactory[0]);
        const obj = componentFactory[1]();
        const watchers = {}

        for (const [key, value] of Object.entries(obj)) {
          watchers[key] = function () {
            debugger;
            return componentFactory[1]()[key];
          };
        }

        dummy = new Vue({
          computed: {
            ...watchers
          },
        });

        propsData = dummy;
      } else {
        Component = Vue.extend(componentFactory);
        propsData = {};
      }

      const instance = new Component({
        propsData: {
          propsData,
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

