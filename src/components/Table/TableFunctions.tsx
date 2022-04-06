
  import {CellContent} from './TableTypes'

  export const changeColValue = (columns: any[], cellIndex: number, value: any, key: string) => {
    const correctValue = typeof value === 'boolean' ? value.toString() : value;
    const newColumns = [...columns];
    newColumns[cellIndex][key] = correctValue
    return (newColumns)
  }

  export const changeCellValue = (rows: any[], rowIndex: number, cellIndex: number, value: string, key: string): CellContent[][] => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex][key] = value
    return newRows
  }

  export const deleteColumn = (rows: CellContent[][], columns: CellContent[], colIndex: number): {newRows: CellContent[][], newColumns: CellContent[]} => {
    const newRows = [...rows]
    newRows.forEach(row => row.splice(colIndex, 1))
    const newColumns = [...columns]
    newColumns.splice(colIndex, 1)
    return {newRows, newColumns}
  }

  export const deleteRow = (rows: CellContent[][], rowIndex: number): CellContent[][] => {
    const newRows = [...rows]
    newRows.splice(rowIndex, 1)
    return newRows
  }

  export const addRow = (rows: CellContent[][]): CellContent[][] => {
    const newRows = [...rows]
    const filledNewRow = rows[rows.length - 1].map((cell: CellContent) => {return {...cell}})
    newRows.push(filledNewRow);
    return newRows
  }

  export const addNewColumn = (rows: CellContent[][], columns: CellContent[]): {newRows: CellContent[][], newColumns: CellContent[]} => {
    const newRows = [...rows]
    newRows.forEach(row => {
      const newCol = {...row[row.length - 1]}
      row.push(newCol)
    })
    const newColumns = [...columns]
    newColumns.push(newColumns[newColumns.length - 1])
    return {newRows, newColumns}
  }
