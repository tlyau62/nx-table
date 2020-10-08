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

## Usage
```vue
<template>
  <div class="example-table">
    <h4>Example 1</h4>
    <v-datatable :rows="rows" :stripe-classes="['odd', 'even']">
      <v-datatable-column title="Name" data="name" />
      <v-datatable-column title="Salary" data="salary" />
      <v-datatable-column title="Age" data="age" width="20px" />
    </v-datatable>
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import VDatatableColumn from "@/components/datatable/VDatatableColumn";
import _ from "lodash";
export default {
  name: "ExampleTable",
  components: {
    VDatatable,
    VDatatableColumn,
  },
  data() {
    return {
      rows: [],
      columns: [],
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
    this.columns = [
      { title: "Name", data: "name" },
      { title: "Salary", data: "salary" },
      { title: "Age", data: "age", width: "20px" },
    ];
  },
};
</script>

<style lang="scss">
</style>
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

- ```rowReorder {Boolean, Object}```

  Enable row reorder. You may also need to listen for row reorder event.

  See [Datatable rowReorder option](https://datatables.net/reference/option/rowReorder)

  Related: RowReorder listener
- ```stripeClasses {Array}```

  Set the zebra stripe class names for the rows in the table. Default value is no stripe class. To enable it just like the official style, set its value to ```['odd', 'even']```.

  See [Datatable stripeClasses option](https://datatables.net/reference/option/stripeClasses)

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

- ```defaultContent {string}```

  Define the default content of the cell if data is undefined. Make sure either ```data``` or ```defaultContent``` is defined.

  See [Datatable columns.defaultContent](https://datatables.net/reference/option/columns.defaultContent)

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
