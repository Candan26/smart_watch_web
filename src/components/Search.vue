<template>
  <div class="search">
    <input type="text" v-model="query"/><!-- buras ı bind ediyor-->
    <button v-on:click="handleSearch">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods:{
    handleSearch(){
      console.log(this.query);
      this.$emit('SearchRequested',this.query);
    }
  }
}
</script>


<style>
.search input{
  padding: 10px 20px;
  border:  1px solid #42b983;
  border-radius: 5px;
  width: 400px;
;
}
.search button{
  padding: 5px 15px;
  border: 1px solid #123456;
  font-size: large;
  border-radius: 300px;
}
</style>
