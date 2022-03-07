
  import {CellProps} from './TableTypes'

  export const changeColValue = (columns: any[], cellIndex: number, value: string, key: string) => {
    const newColumns = [...columns];
    newColumns[cellIndex][key] = value
    return (newColumns)
  }

  export const changeCellValue = (rows: any[], rowIndex: number, cellIndex: number, value: string, key: string): CellProps[][] => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex][key] = value
    return newRows
  }

  export const deleteColumn = (rows: CellProps[][], columns: CellProps[], colIndex: number): {newRows: CellProps[][], newColumns: CellProps[]} => {
    const newRows = [...rows]
    newRows.forEach(row => row.splice(colIndex, 1))
    const newColumns = [...columns]
    newColumns.splice(colIndex, 1)
    return {newRows, newColumns}
  }

  export const deleteRow = (rows: CellProps[][], rowIndex: number): CellProps[][] => {
    const newRows = [...rows]
    newRows.splice(rowIndex, 1)
    return newRows
  }

  export const addRow = (rows: CellProps[][]): CellProps[][] => {
    const newRows = [...rows]
    const filledNewRow = rows[rows.length - 1].map((cell: any) => {return {...cell}})
    newRows.push(filledNewRow);
    return newRows
  }

  export const addNewColumn = (rows: CellProps[][], columns: CellProps[]): {newRows: CellProps[][], newColumns: CellProps[]} => {
    const newRows = [...rows]
    newRows.forEach(row => {
      const newCol = {...row[row.length - 1]}
      row.push(newCol)
    })
    const newColumns = [...columns]
    newColumns.push(newColumns[newColumns.length - 1])
    return {newRows, newColumns}
  }
