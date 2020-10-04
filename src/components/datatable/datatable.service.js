import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';

const datatable = {
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
};

export default datatable;