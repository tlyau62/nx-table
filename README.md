# Datatable
Vue verson of datatable

## Features
- Render a table
- Select row
- Reoreder row
- Order column

## Notes
- https://datatables.net/reference/index

## Usage
```vue
<template>
  <div class="example-table">
    <h4>Example 1</h4>
    <v-datatable :rows="rows" :columns="columns" />
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import _ from "lodash";

export default {
  name: "ExampleTable",
  components: {
    VDatatable,
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
```

## VDatatable
### Props
- ```rows {Array}```

  Define the rows data to show.

  See [Datatable data option](https://datatables.net/reference/option/data)

- ```columns {Array}```

  Define the columns to show.

  See [Datatable columns option](https://datatables.net/reference/option/columns)

  Additional props
  - ```component {Object}```
    
    The component object is a [vue option](https://cn.vuejs.org/v2/api/#Vue-extend) that has 4 properties injected ```["cellData", "rowData", "rowIndex", "colIndex"]```. The detail of these properties can be found in the section [datatable columns.createdCell](https://datatables.net/reference/option/columns.createdCell).

    Noted that the property ```rowData``` is reactive.

    Example of a table component
    ```html
    <template>
      <span>
        <v-action-button @click="edit" />
      </span>
    </template>

    <script>
    export default {
      props: ["cellData", "rowData", "rowIndex", "colIndex"],
      methods: {
        edit() {
          this.$router.push({
            name: "EditFolder",
            params: { id: e.row.data().id },
          });
        },
      },
    }
    </script>
    ```

    To allow a column to render a vue component, you need to add the property ```component```, additionally with either a property ```data``` or ```defaultContent``` to setup correctly.

    Example of table column setup:
    ```js
    this.columns = [
      { title: "Name", data: "name" },
      {
        title: "TestAge",
        data: "age", // or defaultContent: ""
        component: RenderComponent,
      },
    ];
    ```

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

### Listeners
- rowReorder

  We add a new property ```reorderedRow``` on the event object that contains the reordered rows.

  See [Datatable rowReorder event](https://datatables.net/reference/event/row-reorder)
- order

  Define the event listener for order

  See [Datatable order event](https://datatables.net/reference/event/order)
