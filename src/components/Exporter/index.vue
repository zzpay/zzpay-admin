<template>
  <el-button type="primary" plain @click="exportExcel()">{{buttonValue}}</el-button>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    props: ['buttonValue', 'table', 'excelName', 'hideCol'],
    methods: {
      exportExcel(fn) {
        var tableId = this.table || 'data-table'
        var name = this.excelName || '支付中心报表' + Date.now()
        var hideCol = this.hideCol || []
        var elt = document.getElementById(tableId)
        var wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet 1' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        this.deleteColByHeaderName(ws, '操作')
        for (var hideColName of hideCol) {
          this.deleteColByHeaderName(ws, hideColName)
        }
        this.deleteColByHeaderName(ws, '操作')
        return XLSX.writeFile(wb, fn || name + '.xlsx')
      },
      deleteCol(ws, index) {
        const range = XLSX.utils.decode_range(ws['!ref'])

        for (let col = index; col < range.e.c; col++) {
          for (let row = range.s.r; row <= range.e.r; row++) {
            ws[this.encodeCell(row, col)] = ws[this.encodeCell(row, col + 1)]
          }
        }

        range.e.c--

        ws['!ref'] = XLSX.utils.encode_range(range.s, range.e)
      },
      deleteColByHeaderName(ws, name) {
        // 参考 https://c7sky.com/parse-spreadsheet-with-js-xlsx-in-node-js.html
        // 按标题删除列更灵活
        var index = 9999
        const range = XLSX.utils.decode_range(ws['!ref'])
        for (let col = 0; col < range.e.c; col++) {
          if (ws[this.encodeCell(range.s.r, col)].v === name) {
            index = col
          }
        }

        this.deleteCol(ws, index)
      },
      encodeCell(r, c) {
        return XLSX.utils.encode_cell({ r, c })
      }

    }
  }
</script>