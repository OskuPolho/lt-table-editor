import React, {useEffect, useState} from 'react';
import {
  Flex,
  Switch,
} from '@contentful/f36-components';

import Table from './Table/Table'
import {FieldProps} from './Table/TableTypes'
import {
  changeCellValue,
  changeColValue,
  addNewColumn,
  deleteColumn,
  deleteRow,
  addRow
} from './Table/TableFunctions'

export const TableContext = React.createContext<any>({});

const Field = (props: FieldProps) => {
  const [rows, setRows] = useState<any>(initRows)
  const [columns, setColumns] = useState<any>(initColumns)
  const [isToBeMerged, setIsToBeMerged] = useState<any>(false)
  const [highlightedCol, setHighlightedCol] = useState<number>(-1)
  

  useEffect(() => {
    const fieldValue = props.sdk.field.getValue();
    if (fieldValue) {
      setRows(fieldValue.rows);
      setColumns(fieldValue.columns);
      setIsToBeMerged(fieldValue.isToBeMerged);
    }
  }, [])

  useEffect(() => {
    props.sdk.window.startAutoResizer()
    const newTable = {
      rows,
      columns,
      isToBeMerged
    }
    props.sdk.field.setValue(newTable)
  }, [rows, columns, isToBeMerged])

  return (
    <TableContext.Provider
      value={{
        rows,
        columns,
        changeCellValue,
        changeColValue,
        addNewColumn,
        deleteColumn,
        deleteRow,
        addRow,
        highlightedCol,
        setHighlightedCol,
        setRows,
        setColumns
      }}>
      <Flex flexDirection='column'>
        <Table/>
        <Switch
          name="allow-cookies-controlled"
          id="allow-cookies-controlled"
          isChecked={isToBeMerged}
          onChange={(e) => setIsToBeMerged(!isToBeMerged)}
        >
          Merge cells with same value
        </Switch>
      </Flex>
    </TableContext.Provider>
  )
};

export default Field;

const initRows = [
  [
    {type: 'text', text: 'sample text'},
    {type: 'text', text: 'sample text'}
  ],
  [
    {type: 'text', text: 'sample text'},
    {type: 'text', text: 'sample text'}
  ]
]
const initColumns = [
    {type: 'text', value: 'sample heading'},
    {type: 'text', value: 'sample heading'} 
]
