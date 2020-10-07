<template>
  <div id="app">
    <div class="example">
      <!-- <div class="example__section">
        <ExampleTable />
      </div>

      <div class="example__section">
        <ExampleTable2 />
      </div>

      <div class="example__section">
        <ExampleTable3 />
      </div> -->

      <div class="example__section">
        <ExampleTable />
      </div>

      <div class="example__section">
        <ExampleTable4 />
      </div>
    </div>
  </div>
</template>

<script>
import ExampleTable from "@/components/example/ExampleTable";
import ExampleTable2 from "@/components/example/ExampleTable2";
import ExampleTable3 from "@/components/example/ExampleTable3";
import ExampleTable4 from "@/components/example/ExampleTable4";

export default {
  name: "App",
  components: {
    ExampleTable,
    ExampleTable2,
    ExampleTable3,
    ExampleTable4,
  },
};
</script>

<style lang="scss">
@import "./app.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  height: 100%;
  margin: 1rem;

  .example {
    &__section {
      margin-bottom: 2rem;
    }
  }
}
</style>
