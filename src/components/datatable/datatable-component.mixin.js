import datatableService from './datatable.service';
import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';
import VDatatableComponent from './VDatatableComponent';

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
      const extraPropData = {
        cellData, rowData, rowIndex, colIndex
      };

      if (_.isArray(componentFactory)) {
        Component = componentFactory[0];
        propsData = componentFactory[1];
      } else {
        Component = componentFactory;
        propsData = () => ({});
      }

      const instance = helper.createComponentWrapper(Component, propsData, extraPropData)

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

  createComponentWrapper(Component, propsFactory, extraPropData) {
    const V = Vue.extend(VDatatableComponent);
    const v = new V({
      propsData: {
        tableComponent: Vue.extend(Component),
        propsFactory: propsFactory,
        extraPropData
      }
    });

    v.$mount();

    return v;
  }
};

