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
      let Component, propsData;

      if (_.isArray(componentFactory)) {
        Component = Vue.extend(componentFactory[0]);
        propsData = helper.createWatchers(componentFactory[1]);
      } else {
        Component = Vue.extend(componentFactory);
        propsData = {};
      }

      _.assign(propsData, {
        cellData, rowData, rowIndex, colIndex
      });

      const instance = new Component({ propsData });

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

  createWatchers(watcherFactory) {
    const watchers = {}

    for (const [key, value] of Object.entries(watcherFactory())) {
      watchers[key] = function () {
        return watcherFactory()[key];
      };
    }

    const instance = new Vue({
      computed: {
        ...watchers
      },
    });

    return new Proxy(instance, {
      get(target, name) {
        debugger;
        return target[name];
      },
      set(target, name, value) {
        target[name] = value
      }
    });
  }
};

