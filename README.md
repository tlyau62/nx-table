# Datatable
Vue verson of datatable

## Features
- Render a table
- Select row
- Reoreder row
- Order column

## Notes
- https://datatables.net/reference/index
- https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3
- https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-build

## Installation
For vue, use the nx-table plugin from nx-table.
```js
import NxTable from 'nx-table';

Vue.use(NxTable);
```

For css, import the datatable default css and nx-table css.
```scss
@import "~datatables.net-dt/css/jquery.dataTables.min.css";
@import "~datatables.net-select-dt/css/select.dataTables.min.css";
@import "~datatables.net-responsive-dt/css/responsive.dataTables.min.css";
@import "~datatables.net-rowreorder-dt/css/rowReorder.dataTables.min.css";
@import "~nx-table/dist/nx-table.css";
```

## Usage
```vue
<template>
  <div class="example-table">
    <nx-table :rows="rows" :stripe-classes="['odd', 'even']">
      <nx-table-column title="Name" data="name" />
      <nx-table-column title="Salary" data="salary" />
      <nx-table-column title="Age" data="age" width="20px" />
      <nx-table-column title="Action" defaultContent="">
        <button>test</button>
      </nx-table-column>
    </nx-table>
  </div>
</template>

<script>
export default {
  name: "ExampleTable",
  data() {
    return {
      rows: [],
    };
  },
  created() {
    this.rows = [
      {
        name: "John",
        salary: 1000,
        age: 10,
      },
      {
        name: "Peter",
        salary: 2000,
        age: 20,
      },
    ];
  },
};
</script>
```

## nx-table
### Props
- ```rows {Array}```

  Define the rows data to show.

  See [Datatable data option](https://datatables.net/reference/option/data)

- ```serverSide {Boolean}```

    Set to true, to disable datatable internal sorting. It is useful when you need to do server side sorting.

    See [Datatable serverSide option](https://datatables.net/reference/option/serverSide)

- ```processing {Boolean}```

    Show loading indicator.

    See [Datatable processing option](https://datatables.net/reference/option/processing)

- ```select {Boolean, String, Object}```

    Select configuration object.

    See [Datatable select option](https://datatables.net/reference/option/select)

- ```selected {Array}```

  Select certain rows. The array's element is any row data.
  Use together with ```sync``` modifier to get back the selected rows.

  ```vue
  <v-datatable
    :rows="rows"
    :select="{ style: 'os' }"
    :selected.sync="selected"
  />
  ```

  See [Datatable select api](https://datatables.net/reference/api/rows().select())

- ```rowReorder {Boolean, Object}```

  Enable row reorder. You may also need to listen for row reorder event.

  See [Datatable rowReorder option](https://datatables.net/reference/option/rowReorder)

  Related: RowReorder listener
- ```stripeClasses {Array}```

  Set the zebra stripe class names for the rows in the table. Default value is no stripe class. To enable it just like the official style, set its value to ```['odd', 'even']```.

  See [Datatable stripeClasses option](https://datatables.net/reference/option/stripeClasses)

- ```order {Array}```

  Order the table.

  See [Datatable order option](https://datatables.net/reference/option/order)

### Listeners
- rowReorder

  Rows have been reordered by the end user.

  New properties
  - ```reorderedRow {Array}``` : the reordered rows.

  See [Datatable rowReorder event](https://datatables.net/reference/event/row-reorder)
- order

  Define the event listener for order.

  New properties
  - ```ordCols {Array}``` : the ordered columns
  - ```ordStr {String}``` : the ordered columns in query string format

  See [Datatable order event](https://datatables.net/reference/event/order)

## nx-table-column

Define the table column. Should be the direct child of the nx-table component.

Noted that not all datatable props are supported.

See [Datatable column](https://datatables.net/reference/option/columns)

### Props
- ```title {String}```

  Define the column's title.

  See [Datatable column.name](https://datatables.net/reference/option/columns.title)

- ```data {String}```

  Define the column's data. Make sure either ```data``` or ```defaultContent``` is defined.

  See [Datatable column.data](https://datatables.net/reference/option/columns.title)

- ```width {String}```

  Define the column's width. It takes any CSS value.

  See [Datatable columns.width](https://datatables.net/reference/option/columns.width)

- ```defaultContent {String}```

  Define the default content of the cell if data is undefined. Make sure either ```data``` or ```defaultContent``` is defined.

  See [Datatable columns.defaultContent](https://datatables.net/reference/option/columns.defaultContent)


- ```orderable {Boolean}```

  Indicate whether the column is orderable or not.

  See [Datatable columns.orderable](https://datatables.net/reference/option/columns.orderable)

- ```className {String}```

  Indicate the css class value

  See [Datatable columns.className](https://datatables.net/reference/option/columns.className)

- ```visible {Boolean}```

  Indicate a column is visible

  See [Datatable columns.visible](https://datatables.net/reference/option/columns.visible)

### Scoped slots (default)
- ```cellData {String}```

  The cell data.

  See [datatable columns.createdCell](https://datatables.net/reference/option/columns.createdCell)

- ```rowData {Object}```

  Reactive row data. Useful in display custom data.

  See [datatable columns.createdCell](https://datatables.net/reference/option/columns.createdCell)

- ```rowIndex {Number}```

  The row number.

  See [datatable columns.createdCell](https://datatables.net/reference/option/columns.createdCell)

- ```colIndex {Number}```

  The column number.

  See [datatable columns.createdCell](https://datatables.net/reference/option/columns.createdCell)
