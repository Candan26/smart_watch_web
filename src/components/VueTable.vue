<template>
  <div>
    <b-table hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
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
        }
      ]
    }
  }
}
</script>