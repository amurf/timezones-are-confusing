<template>
  <div id="app" class="bg-gray-800">

    <div class='center'>
      <input v-model.lazy="dateString" placeholder="22nd March 2023 4pm"
                                       class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-2xl leading-tight focus:outline-none focus:shadow-outline">

      <div class='text-purple-300 text-2xl' v-if="hasDate">
        <p>That date is {{ parsedDate.format(dateFormat) }} for you, which is {{ parsedDate.fromNow() }}</p>
      </div>

      <div class='text-sm mt-2'>
        <p v-if="hasDate">Converted from {{ convertedDate.format(dateFormat + ' z') }}</p>
        <p>Your timezone is detected as {{ userTimezone }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import chrono from 'chrono-node';
import moment from 'moment-timezone';

import TimezoneRefiner from './chrono-refiner-timezone';

var custom = new chrono.Chrono();
custom.refiners.push(TimezoneRefiner);

export default {
  name: 'App',
  data() {
    return {
      darkMode: true,
      dateString: '',
      userTimezone: moment.tz.guess(),
      dateFormat: 'dddd, MMMM Do hh:mm a',
    };
  },
  computed: {
    convertedDate() {
      return this.parsedDate.tz(this.parsedDateObj[0].start.get('timezone') || this.userTimezone);
    },
    parsedDateObj() {
      return custom.parse(this.dateString);
    },
    parsedDate() {
      return moment(this.parsedDateObj[0].start.date());
    },

    hasDate() {
      return this.dateString.length && this.parsedDate.isValid();
    },
  },
  methods: {
    setBackground() {
      console.log("make it black");
    },

  },
  created() {
    this.setBackground();
  },
}
</script>

<style>

#app {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.center {
  display: table-cell;
  vertical-align: middle;
  padding-bottom: 200px;
}
</style>
