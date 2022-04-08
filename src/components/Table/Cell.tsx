import React, {useContext, useState} from 'react';
import { DuetIcon } from "@duetds/react";
import {
  Flex,
  TextInput,
  IconButton,
  Textarea,
  Grid
} from '@contentful/f36-components';
import duetIconsObject from "@duetds/icons"
import * as icons from '@contentful/f36-icons';
import {TableContext} from '../Field';
import {CellProps} from './TableTypes'
import {TypeSelector, ColStyleMenu} from './Selectors'
import duetIcons from "@duetds/icons"

const Cell = (props: CellProps) => {
  const {cellIndex, rowIndex} = props
  const {highlightedCol} = useContext(TableContext)
  return (
    <Flex
      flex={highlightedCol === cellIndex ? '3 1 0' : '1 1 0'}
      justifyContent={'space-between'}
      style={{
        position: 'relative',
        border: '1px solid #E7EBEE',
        borderWidth: '0px 1px 0px 0px',
        padding: '5px',
        backgroundColor: `${cellIndex > 0 ? "#E8F5FF": 'white'}`
      }}
    >
      <CellType {...props}/>
      {rowIndex !== undefined ? <TypeSelector rowIndex={rowIndex} cellIndex={cellIndex}/> : <ColStyleMenu {...props}/>}
    </Flex>
  )
}

export default Cell

const CellType = (props: CellProps) => {
    const {rowIndex, content} = props
    if (rowIndex === undefined) return <ColHeader {...props}/>
    switch (content.type) {
      case 'text': return <TextCell {...props}/>
      case 'icon': return  <IconCell {...props}/>
      case 'collapsible': return  <CollapsibleCell {...props}/>
      default: return <div></div>
    }
  };

const TextCell = (props: CellProps) => {
  const {content, cellIndex, rowIndex} = props
  const {text} = content;
  const {changeCellValue, rows, setHighlightedCol, setRows} = useContext(TableContext);
  return (
    <div style={{flexGrow: 1}}>
    <TextInput
      style={{marginRight: '5px'}}
      value={text}
      onFocus={() => {
        setHighlightedCol(cellIndex)
      }}
      onBlur={() => {
        setHighlightedCol(null)
      }}
      onChange={(e) => {
        const newRows = changeCellValue(rows, rowIndex, cellIndex, e.target.value, 'text');
        setRows(newRows);
      }}
    />
    </div>
  )
}

const IconCell = (props: CellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {content, cellIndex, rowIndex} = props
  const {text} = content;
  const {changeCellValue, rows, columns, setRows} = useContext(TableContext);
  const iconList: any = Object.values(duetIcons).map(value => value.title)

  return (
    <Flex flex={'1 1 0'} justifyContent={'center'}>
      {isOpen && 
        <Grid 
          style={{
            padding: '15px',
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 100,
            top: '40px',
            left: cellIndex <= columns.length / 2 ? '10px' : 'auto',
            right: cellIndex > columns.length / 2 ? '10px' : 'auto',
            boxShadow: '5px 5px 25px rgba(0,0,0,0.3)'
          }}
          columns="repeat(13, 1fr)"
        >
          {Object.keys(duetIconsObject).map(key => {
            return (
              <Grid.Item
                key={`key-${key}`}
                onClick={() => {
                  const newRows = changeCellValue(rows, rowIndex, cellIndex, key, 'text');
                  setRows(newRows);
                  setIsOpen(false)
                }}
                style={{cursor: 'pointer'}}
              >
                <DuetIcon name={key} size='x-small' margin='none'/>
              </Grid.Item>)
          })}
        </Grid>
      }
      <Flex fullHeight fullWidth justifyContent={'center'} alignItems={'center'}>
          <Flex>
            {!iconList.includes(text) ?
              <IconButton aria-label='open-icon-menu' icon={<icons.MenuIcon />} onClick={() => {setIsOpen(!isOpen)}}>Select Icon</IconButton>
              :
              <DuetIcon margin='none' name={text} onClick={() => {setIsOpen(!isOpen)}} style={{cursor: 'pointer'}}/>}
          </Flex>
      </Flex>
    </Flex>
  )
}

const CollapsibleCell = (props: CellProps) => {
  const {content, cellIndex, rowIndex} = props
  const {text, heading} = content;
  const {changeCellValue, rows, setHighlightedCol, setRows} = useContext(TableContext);
  const [extended, setExtended] = useState(false);
  return (
    <div style={{flexGrow: extended ? 6 : 1}}>
    <TextInput
      value={heading}
      onFocus={() => {
        setHighlightedCol(cellIndex);
        setExtended(true)
      }}
      onBlur={() => {
        setHighlightedCol(null);
        setExtended(false)
      }}
      onChange={(e) => {
        const newRows = changeCellValue(rows, rowIndex, cellIndex, e.target.value, 'heading')
        setRows(newRows)
      }}
    />
    <Textarea
      value={text}
      rows={extended ? 10 : 2}
      onChange={(e) => {
        const newRows = changeCellValue(rows, rowIndex, cellIndex, e.target.value, 'text');
        setRows(newRows);
      }}
      onFocus={() => {
        setHighlightedCol(cellIndex);
        setExtended(true)
      }}
      onBlur={() => {
        setHighlightedCol(null);
        setExtended(false)
      }}
      style={{marginTop: '5px'}}
    />
    </div>
  )
}

const ColHeader = (props: CellProps) => {
  const {content, cellIndex} = props
  const {changeColValue, rows, columns, deleteColumn, setHighlightedCol, setColumns, setRows} = useContext(TableContext);
  return (
    <Flex style={{flexGrow: 1}} flexDirection='column'>
      <IconButton icon={<icons.DeleteIcon/>} onClick={() => {
            if (columns.length > 2) {
              const {newRows, newColumns} = deleteColumn(rows, columns, cellIndex);
              setColumns(newColumns);
              setRows(newRows);
            }
          }}
          aria-label={'minus'}
      />
      <TextInput
        style={{fontWeight: 'bold'}}
        value={content.value}
        onFocus={() => {
          setHighlightedCol(cellIndex)
        }}
        onBlur={() => {
          setHighlightedCol(null)
        }}
        onChange={(e) => {
          const newColumns = changeColValue(columns, cellIndex, e.target.value, 'value');
          setColumns(newColumns);
        }}
      />
    </Flex>
    )
}

