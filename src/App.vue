<template>
  <div id="app" class="bg-gray-800">

    <div class='center'>

      <input @blur="checkString()" v-model.lazy="dateString" placeholder="22nd March 2023 4pm"
                                       class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-2xl leading-tight focus:outline-none focus:shadow-outline">

      <div class='text-purple-300 text-2xl' v-if="hasDate">
        <p>That date is {{ userDate }} for you, which is {{ response.from_now }}</p>
      </div>

      <div class='text-sm mt-2'>
        <p v-if="hasDate">Converted from {{ convertedDate }} {{ response.timezone }}</p>
        <p>Your timezone is detected as {{ userTimezone }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      darkMode: true,
      dateString: '',
      response: {},
      userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateFormat: 'dddd, MMMM d hh:mm a',
    };
  },
  computed: {
    date() {
      return new Date(Date.parse(this.response.utc_date));
    },
    convertedDate() {
      return this.date.toLocaleString("en-US", { timeZone: this.response.timezone, dateStyle: "full", timeStyle: "medium" });
    },
    userDate() {
      return this.date.toLocaleString("en-US", { timeZone: this.userTimezone, dateStyle: "full", timeStyle: "medium" });
    },
    hasDate() {
      return this.dateString.length && this.response.valid;
    },
  },
  methods: {
    async checkString() {
      let response = await fetch('https://timezone-api.herokuapp.com/?date=' + this.dateString + "&tz=" + this.userTimezone);
      let dateJson = await response.json();

      this.response = dateJson;
    },

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
