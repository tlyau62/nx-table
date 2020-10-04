import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';

const datatable = {
  /**
   * Pure
   */
  mergeFunction(obj, option, propertyFunc) {
    const cloneObj = _.cloneDeepWith(obj, datatable.cloneDeepExceptObservable);
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
    return _.cloneDeepWith(columns, datatable.cloneDeepExceptObservable).map((col) =>
      this.mergeFunction(col, "createdCell", createdCellCallback(col))
    );
  },

  addPreDraw(settings, preDrawCallback) {
    return this.mergeFunction(settings, "preDrawCallback", preDrawCallback);
  },

  isObservable(obj) {
    return obj['__ob__'] !== undefined;
  },

  cloneDeepExceptObservable(obj) {
    if (datatable.isObservable(obj)) {
      return obj;
    }
  }
};

export default datatable;