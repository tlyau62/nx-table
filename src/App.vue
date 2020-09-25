<template>
  <div id="app">
    <div>
      <ExampleTable />
    </div>

    <div>
      <ExampleTable2 />
    </div>
  </div>
</template>

<script>
import ExampleTable from "@/components/example/ExampleTable";
import ExampleTable2 from "@/components/example/ExampleTable2";

export default {
  name: "App",
  components: {
    ExampleTable,
    ExampleTable2,
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
}
</style>
