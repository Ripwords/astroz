<script lang="ts" setup>
import { isDesktop } from '../functions/utility'
const table_width = isDesktop ? "400px" : "330px"
const table_color = "#1e1e1e"
</script>

<template>
  <div class="flex justify-center">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Seeing</th>
          <th>FWHM</th>
          <th>Ideal sampling</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Very Good</td>
          <td>0.5 - 1"</td>
          <td>0.17 - 0.5"</td>
        </tr>
        <tr>
          <td>Good</td>
          <td>1 - 2"</td>
          <td>0.33 - 1"</td>
        </tr>
        <tr>
          <td>Ok</td>
          <td>2 - 4"</td>
          <td>0.67 - 2"</td>
        </tr>
        <tr>
          <td>Poor</td>
          <td>4 - 5"</td>
          <td>1.33 - 2.5"</td>
        </tr>
        <tr>
          <td>Very Poor</td>
          <td>5 - 6"</td>
          <td>1.67 - 3"</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: light) {
  .styled-table {
    background-color: #ffffff;
    color: black;
  }
}

@media (prefers-color-scheme: dark) {
  .styled-table {
    background-color: #1b1b1b;
    color: white;
  }
}

.styled-table {
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: v-bind(table_width);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: v-bind(table_color);
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}


.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid v-bind(table_color);
}
</style>