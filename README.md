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
    
    Allow column to render vue component.

    Example:
    ```js
    {
        this.columns = [
            { title: "Name", data: "name" },
            { title: "Salary", data: "salary" },
            { title: "Age", data: "age", width: "20px" },
            {
            title: "TestAge",
            data: "age",
            component: RenderComponent,
            },
            {
            title: "Icon",
            component: TestComponent,
            data: "age",
            },
        ];
    }
    ```

    See [Vue extend options](https://cn.vuejs.org/v2/api/#Vue-extend)

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
