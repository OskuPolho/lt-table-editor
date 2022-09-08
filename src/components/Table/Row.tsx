import React, {useContext} from 'react';
import {
  Flex,
  IconButton,
  Stack
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
            if (rows.length > 1) {
              const newRows = deleteRow(rows, rowIndex);
              setRows(newRows)
            } 
        } : 
        () => {
            const {newRows, newColumns} = addNewColumn(rows, columns);
            setRows(newRows);
            setColumns(newColumns);
        }
      }
      aria-label={'plus'}
    />
    <ElevatorButtons rowIndex={rowIndex} setRows={setRows} rows={rows}/>
  </Flex>
}

export default Row;

interface ElevatorProps {
  rowIndex: number | undefined,
  rows: RowProps[]
  setRows: () => void
}

const moveRowUpAndDown = (rows: any, rowIndex: number|undefined, direction: -1 | 1, setRows: (arg: RowProps[]) => void) => {
  if (rowIndex === undefined) return
  const newRows = [...rows]
  const newRow = newRows.splice(rowIndex, 1);
  newRows.splice(rowIndex + direction, 0, newRow[0])
  setRows(newRows)
}

const ElevatorButtons = ({rowIndex, setRows, rows}: ElevatorProps) => {
  return (
    <Stack flexDirection='column'>
    <IconButton
      icon={<icons.ArrowUpIcon/>}
      onClick={() => {moveRowUpAndDown(rows, rowIndex, -1, setRows)}}
      aria-label={'up'}
    />
    <IconButton
      icon={<icons.ArrowDownIcon/>}
      onClick={() => {moveRowUpAndDown(rows, rowIndex, 1, setRows)}}
      aria-label={'down'}
    />
    </Stack>
  )
}