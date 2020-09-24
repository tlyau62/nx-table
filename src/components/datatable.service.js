import Vue from "vue";
import $ from "jquery";

const datatable = {
  /**
   * state
   */
  componentStore: [],

  /**
   * Pure
   */
  mergeFunction(obj, option, propertyFunc) {
    const cloneObj = _.cloneDeep(obj);
    let cb = propertyFunc;

    if (cloneObj[option]) {
      cb = (...args) => {
        cloneObj[option](...args);
        cb(...args);
      };
    }

    cloneObj[option] = cb;

    return cloneObj;
  },

  addCreatedCell(columns, createdCellCallback) {
    return _.cloneDeep(columns).map((col) =>
      this.mergeFunction(col, "createdCell", createdCellCallback(col))
    );
  },

  addPreDraw(settings, preDrawCallback) {
    return this.mergeFunction(settings, "preDrawCallback", preDrawCallback);
  },

  calculateReorderedRow(rows, diff) {
    const reorderedRow = rows.slice();

    for (const d of diff) {
      reorderedRow[d.newPosition] = rows[d.oldPosition];
    }

    return reorderedRow;
  },

  /**
   * Impure
   */
  cleanComponentStore() {
    for (const component of this.componentStore) {
      component.$destroy();
    }
    this.componentStore = [];
  },

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

  processColumns(columns) {
    return (
      datatable.addCreatedCell(columns, (col) =>
        datatable.createComponent(this.componentStore, col.component)
      ) || []
    );
  },
};

export default datatable;