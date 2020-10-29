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
      items: [
        /*
        {id: 40, type: 'Dickerson', data: 'Macdonald', date:'2020', person:'cagri'},
        {id: 21, type: 'Larsen', data: 'Shaw', date:'2020', person:'cagri'},
        {
          id: 89,
          type: 'Geneva',
          data: 'Wilson',
          date:'2020', person:'cagri',
          _rowVariant: 'danger'
        },
        {
          id: 40,
          type: 'Thor',
          data: 'MacDonald',
          date:'2020', person:'cagri',
          _cellVariants: {id: 'info', type: 'info', data : 'info', date: 'info',person:'info'}
        },
        {
          id: 29,
          type: 'Dick',
          data: 'Dunlap',
          date:'2020', person:'cagri',
          _cellVariants: {id:'warning',  type: 'warning', data : 'warning', date: 'warning',person:'warning'}
        }*/
      ]
    }
  }
}
</script>