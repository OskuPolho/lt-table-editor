import React, {useEffect, useState} from 'react';
import {
  Flex,
  FormControl,
  Select,
  Switch,
} from '@contentful/f36-components';

import Table from './Table/Table'
import {CellContent, FieldProps} from './Table/TableTypes'
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
      {
        type: 'text',
        value: 'sample heading',
        selectedColumn: 'false'
      },
      {
        type: 'text',
        value: 'sample heading',
        selectedColumn: 'false'
      } 
  ]

  const initCollapsibleHeadingSize = props.sdk.entry.getSys().environment.sys.id === 'dev' ? 'large' : 'medium'
  
  const [rows, setRows] = useState<CellContent[][]>(initRows)
  const [columns, setColumns] = useState<CellContent[]>(initColumns)
  const [isToBeMerged, setIsToBeMerged] = useState<string>("false")
  const [collapsibleHeadingSize, setCollapsibleHeadingSize] = useState<string>(initCollapsibleHeadingSize)
  const [highlightedCol, setHighlightedCol] = useState<number>(-1)
  


  useEffect(() => {
    const fieldValue = props.sdk.field.getValue();
    if (fieldValue?.rows) {
      if (fieldValue.rows.length > 1) {
        setRows(fieldValue.rows);
      } else {
        setRows(initRows);
      }
    }
    if (fieldValue?.columns) {
      if (fieldValue.columns.length > 1) {
        fieldValue.columns.forEach((column: CellContent) => {
          column.selectedColumn = column.selectedColumn !== undefined ? column.selectedColumn.toString() : "false"
        })
        setColumns(fieldValue.columns);
      } else {
        setColumns(initColumns)
      }
    }
    if (fieldValue?.isToBeMerged !== undefined) {
      setIsToBeMerged(fieldValue.isToBeMerged.toString());
    } else {
      setIsToBeMerged("true")
    }
    if (fieldValue?.collapsibleHeadingSize) {
      setCollapsibleHeadingSize(fieldValue.collapsibleHeadingSize);
    } else {
      setCollapsibleHeadingSize(initCollapsibleHeadingSize)
    }
  }, [])

  useEffect(() => {
    if (columns.length < 1 || rows.length < 1) {
      setRows(initRows);
      setColumns(initColumns);
    }
    props.sdk.window.startAutoResizer()
    const newTable = {
      rows,
      columns,
      isToBeMerged: isToBeMerged.toString(),
      collapsibleHeadingSize
    }
    props.sdk.field.setValue(newTable)
      .then(res => console.log({res}))
  }, [rows, columns, isToBeMerged, collapsibleHeadingSize])

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
          isChecked={JSON.parse(isToBeMerged)}
          onChange={(e) => {
            const value = !JSON.parse(isToBeMerged);
            setIsToBeMerged(value.toString())
          }}
        >
          Merge cells with same value
        </Switch>
        <FormControl style={{marginTop: '30px'}}>
          <FormControl.Label>Collapsible Heading Size</FormControl.Label>
          <Select
            value={collapsibleHeadingSize}
            onChange={(e) => setCollapsibleHeadingSize(e.target.value)}
          >
            {collapsibleHeadingSizes.map(size => {
              return <Select.Option value={size}>{size}</Select.Option>
            })}
          </Select>
        </FormControl>
      </Flex>
    </TableContext.Provider>
  )
};

export default Field;

const collapsibleHeadingSizes = [
  "x-small",
  "small",
  "medium",
  "large",
  "x-large",
  "xx-large",
  "xxx-large",
  "xxxx-large"
]