<template>
  <div>
    <b-table hover :items="items"  :striped="true" :bordered="true" :dark="true" :sticky-header="false"></b-table>
  </div>
</template>

<script>
let that
export default {
mounted() {
  that = this;
  },
  methods:{
    updateTable:(tableArray) =>{
      that._data.items=[]
      let i;
      let tableLabel= ['info','primary','warning']
      for (i=0 ; i<tableArray.length;i++){
        that.pushData(tableArray[i],tableLabel[i%3])
      }
    },
    pushData:(element, rawVariant) =>{
      that._data.items.push({id:element.id,
        type:element.type,
        data:element.data,
        date:element.date,
        person:element.person,
        _rowVariant: rawVariant})
    }
  },
  data() {
    return {
      items: []
    }
  }
}
</script>