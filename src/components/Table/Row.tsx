import React, {useContext} from 'react';
import {
  Flex,
  IconButton,
} from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons'
import Cell from './Cell'
import {TableContext} from '../Field';
import {RowProps} from './TableTypes'

const Row = (props: RowProps) => {
  const {cells, rowIndex} = props
  const isRow = rowIndex !== undefined
  const {deleteRow, addNewColumn, setRows, setColumns, rows, columns} = useContext(TableContext)
  return <Flex flexDirection='row' style={{border: '1px solid #CFD9E0', borderWidth: '0px 0px 1px 0px'}}>
    {cells.map((cell, index) => {
      return <Cell key={`key-${index}`} content={cell} rowIndex={rowIndex} cellIndex={index}></Cell>
    })}
    <IconButton
      icon={isRow ? <icons.DeleteIcon/> : <icons.PlusCircleIcon/>}
      onClick={isRow ? 
        () => {
            const newRows = deleteRow(rows, rowIndex);
            setRows(newRows)
        } : 
        () => {
            const {newRows, newColumns} = addNewColumn(rows, columns);
            setRows(newRows);
            setColumns(newColumns);
        }
      }
      aria-label={'plus'}
    />
  </Flex>
}

export default Row;