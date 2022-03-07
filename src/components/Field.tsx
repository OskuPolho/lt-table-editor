import React, {useContext, useEffect, useState} from 'react';
import { PlainClientAPI } from 'contentful-management';
import { DuetIcon } from "@duetds/react";
import {
  Flex,
  TextInput,
  IconButton,
  Select,
  Textarea,
  Menu,
  Form,
  FormControl,
  Switch,
  Grid
} from '@contentful/f36-components';
import duetIconsObject from "@duetds/icons"
import * as icons from '@contentful/f36-icons';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

interface CellProps {
  cellIndex: number,
  rowIndex: number | undefined,
  content: {
    text: string,
    type: string,
    heading?: string,
    value?: string,
    width?: string,
    fontSize?: string,
    fontWeight?: string,
    selectedColumn?: boolean,
    textAlign: string
  }
}

const TableContext = React.createContext<any>({});

const TypeSelector = (props: {rowIndex: number | undefined, cellIndex: number}) => {
  const {rowIndex, cellIndex} = props
  const {changeCellValue, rows} = useContext(TableContext)
  return (
    <Menu>
      <Menu.Trigger>
        <IconButton style={{height: '40px'}} icon={<icons.ArrowDownIcon />} aria-label={'open type selector'} size="small"/>
      </Menu.Trigger>
      <Menu.List>
        <Menu.Item onClick={() => changeCellValue(rows, rowIndex, cellIndex, 'text', 'type')}>Text</Menu.Item>
        <Menu.Item onClick={() => changeCellValue(rows, rowIndex, cellIndex, 'icon', 'type')}>Icon</Menu.Item>
        <Menu.Item onClick={() => changeCellValue(rows, rowIndex, cellIndex, 'collapsible', 'type')}>Collapsible</Menu.Item>
      </Menu.List>
    </Menu>
  )
}

const ColStyleMenu = (props: CellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {changeCellValue, rows} = useContext(TableContext)
  return (
    <Flex flexDirection='column'>
      <IconButton icon={<icons.ArrowDownIcon/>} onClick={() => setIsOpen(!isOpen)} aria-label='style menu'/>
      {isOpen && <ColumnStyleForm {...props}/>}
    </Flex>
  )
}

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

const TextCell = (props: CellProps) => {
  const {content, cellIndex, rowIndex} = props
  const {text} = content;
  const {changeCellValue, rows, setHighlightedCol} = useContext(TableContext);
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
        changeCellValue(rows, rowIndex, cellIndex, e.target.value, 'text')
      }}
    />
    </div>
  )
}

const IconCell = (props: CellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {content, cellIndex, rowIndex} = props
  const {text} = content;
  const {changeCellValue, rows, columns} = useContext(TableContext);
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
                  changeCellValue(rows, rowIndex, cellIndex, key, 'text');
                  setIsOpen(false)
                }}
                style={{cursor: 'pointer'}}
              >
                <DuetIcon name={key} size='x-small' margin='none'/>
              </Grid.Item>)
          })}
        </Grid>
      }
      <DuetIcon margin='none' name={text} onClick={() => {setIsOpen(!isOpen)}} style={{cursor: 'pointer'}}/>
    </Flex>
  )
}

const CollapsibleCell = (props: CellProps) => {
  const {content, cellIndex, rowIndex} = props
  const {text, heading} = content;
  const {changeCellValue, rows, setHighlightedCol} = useContext(TableContext);
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
        changeCellValue(rows, rowIndex, cellIndex, e.target.value, 'heading')
      }}
    />
    <Textarea
      value={text}
      rows={extended ? 10 : 2}
      onChange={(e) => {
        changeCellValue(rows, rowIndex, cellIndex, e.target.value, 'text')
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
  const {changeColValue, columns, deleteColumn, setHighlightedCol} = useContext(TableContext);
  return (
    <Flex style={{flexGrow: 1}} flexDirection='column'>
      <IconButton icon={<icons.DeleteIcon/>} onClick={() => deleteColumn(cellIndex)} aria-label={'minus'}/>
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
          changeColValue(columns, cellIndex, e.target.value, 'value')
        }}
      />
    </Flex>
    )
}

interface rowProps {
  cells: any[],
  rowIndex?: number
}

const Row = (props: rowProps) => {
  const {cells, rowIndex} = props
  const isRow = rowIndex !== undefined
  const {deleteRow, addNewColumn} = useContext(TableContext)
  return <Flex flexDirection='row' style={{border: '1px solid #CFD9E0', borderWidth: '0px 0px 1px 0px'}}>
    {cells.map((cell, index) => {
      return <Cell key={`key-${index}`} content={cell} rowIndex={rowIndex} cellIndex={index}></Cell>
    })}
    <IconButton
      icon={isRow ? <icons.DeleteIcon/> : <icons.PlusCircleIcon/>}
      onClick={isRow ? () => deleteRow(rowIndex) : () => addNewColumn()}
      aria-label={'plus'}
    />
  </Flex>
}

interface TableProps {
  rows: any[]
  columns: any[]
} 

const Table = () => {
  const {addRow, rows, columns} = useContext(TableContext)
  return (
      <Flex>
        <Flex flexDirection='column' flexGrow={6}>
          <Row cells={columns} />
          {rows.map((row: rowProps[], index: number) => <Row key={`key-row_${index}`} cells={row} rowIndex={index}></Row>)}
          <div style={{marginTop: '5px', width: '100%'}}>
            <IconButton
              icon={<icons.PlusCircleIcon/>}
              onClick={() => addRow()}
              aria-label={'plus'}
              isFullWidth={true}
            />
          </div>
        </Flex>
      </Flex>
  )
}

const WidthSelector = (props: CellProps) => {
  const {columns, changeColValue} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Width</FormControl.Label>
      <TextInput value={content.width} onChange={(e) => changeColValue(columns, cellIndex, e.target.value, 'width')}/>
    </FormControl>
  )
}

const FontSizeSelector = (props:CellProps) => {
  const {columns, changeColValue} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Font Size</FormControl.Label>
      <Select
        id="optionSelect-controlled"
        name="fontSize-controller"
        value={content.fontSize}
        onChange={(e) => changeColValue(columns, cellIndex, e.target.value, 'fontSize')}
      >
        <Select.Option value="var(--font-size-x-small)">var(--font-size-x-small)</Select.Option>
        <Select.Option value="var(--font-size-small)">var(--font-size-small)</Select.Option>
        <Select.Option value="var(--font-size-medium)">var(--font-size-medium)</Select.Option>
        <Select.Option value="var(--font-size-large)">var(--font-size-large)</Select.Option>
        <Select.Option value="var(--font-size-x-large)">var(--font-size-x-large)</Select.Option>
        <Select.Option value="var(--font-size-xx-large)">var(--font-size-xx-large)</Select.Option>
      </Select>
    </FormControl>
  )
}

const FontWeightSelector = (props:CellProps) => {
  const {columns, changeColValue} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Font Weight</FormControl.Label>
      <Select
        id="optionSelect-controlled"
        name="fontSize-controller"
        value={content.fontWeight}
        onChange={(e) => changeColValue(columns, cellIndex, e.target.value, 'fontWeight')}
      >
        <Select.Option value="var(--font-weight-normal)">var(--font-weight-normal)</Select.Option>
        <Select.Option value="var(--font-weight-semi-bold)">var(--font-weight-semi-bold)</Select.Option>
        <Select.Option value="var(--font-weight-extra-bold)">var(--font-weight-extra-bold)</Select.Option>
      </Select>
    </FormControl>
  )
}

const TextAlignSelector = (props:CellProps) => {
  const {columns, changeColValue} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Text Align</FormControl.Label>
      <Select
        id="optionSelect-controlled"
        name="fontSize-controller"
        value={content.textAlign}
        onChange={(e) => changeColValue(columns, cellIndex, e.target.value, 'textAlign')}
      >
        <Select.Option value="left">left</Select.Option>
        <Select.Option value="center">center</Select.Option>
        <Select.Option value="right">right</Select.Option>
      </Select>
    </FormControl>
  )
}

const IsSelectedColumn = (props: CellProps) => {
  const {columns, changeColValue} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <Switch
        name="allow-cookies-controlled"
        id="allow-cookies-controlled"
        isChecked={content.selectedColumn}
        onChange={(e) => changeColValue(columns, cellIndex, !content.selectedColumn, 'selectedColumn')}
      >
        Selected Column
      </Switch>
    </FormControl>
  )
}

const ColumnStyleForm = (props: CellProps) => {
  return (
    <Flex style={{
        position:'absolute',
        top: 40,
        right: 0,
        backgroundColor: '#ffffff',
        padding: '15px',
        zIndex: 10,
        borderRadius: '10px',
        boxShadow: '5px 5px 25px rgba(0,0,0,0.3)'
      }}>
      <Form>
        <WidthSelector {...props}/>
        <FontSizeSelector {...props}/>
        <FontWeightSelector {...props}/>
        <TextAlignSelector {...props}/>
        <IsSelectedColumn {...props}/>
      </Form>
    </Flex>
  )
}

const Field = (props: FieldProps) => {
  const changeColValue = (columns: any[], cellIndex: number, value: string, key: string) => {
    const newColumns = [...columns];
    newColumns[cellIndex][key] = value
    setColumns(newColumns)
  }
  const changeCellValue = (rows: any[], rowIndex: number, cellIndex: number, value: string, key: string) => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex][key] = value
    setRows(newRows)
  }
  const deleteColumn = (colIndex: number) => {
    const newRows = [...rows]
    newRows.forEach(row => row.splice(colIndex, 1))
    const newColumns = [...columns]
    newColumns.splice(colIndex, 1)
    setColumns(newColumns);
    setRows(newRows)
  }
  const deleteRow = (rowIndex: number) => {
    const newRows = [...rows]
    newRows.splice(rowIndex, 1)
    setRows(newRows)
  }
  const addRow = (rowIndex: number) => {
    const newRows = [...rows]
    const filledNewRow = rows[rows.length - 1].map((cell: any) => {return {...cell}})
    newRows.push(filledNewRow);
    setRows(newRows)
  }
  const addNewColumn = () => {
    const newRows = [...rows]
    newRows.forEach(row => {
      const newCol = {...row[row.length - 1]}
      row.push(newCol)
    })
    const newColumns = [...columns]
    newColumns.push(newColumns[newColumns.length - 1])
    setColumns(newColumns);
    setRows(newRows)
  }
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
      columns
    }
    props.sdk.field.setValue(newTable)
  }, [rows, columns])

  return <TableContext.Provider value={{rows, columns, changeCellValue, changeColValue, addNewColumn, deleteColumn, deleteRow, addRow, highlightedCol, setHighlightedCol}}>
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
};

export default Field;
