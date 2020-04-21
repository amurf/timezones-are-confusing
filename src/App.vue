<template>
  <div id="app" class="bg-gray-800">

    <div class='center'>
      <input v-model.lazy="dateString" placeholder="Date" 
                                       class="shadow appearance-none border rounded py-2 px-3 text-2xl leading-tight focus:outline-none focus:shadow-outline">

      <div class='text-purple-300 bold text-2xl'>
        <p>That date is <span class='font-bold'>{{ parsedDate.format(dateFormat) }}</span> for you, which is {{ parsedDate.fromNow() }}</p>
      </div>

      <div class='text-sm mt-2'>
        <p>Converted from {{ convertedDate.format(dateFormat + ' z') }}</p>
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
      dateString: '18th april 07 PM utc',
      userTimezone: moment.tz.guess(),
      dateFormat: 'dddd, MMMM Do hh:mm a',
    };
  },
  computed: {
    convertedDate() {
      return this.parsedDate.tz(this.parsedDateObj[0].start.get('timezone'));
    },
    parsedDateObj() {
      return custom.parse(this.dateString);
    },
    parsedDate() {
      return moment(this.parsedDateObj[0].start.date());
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
