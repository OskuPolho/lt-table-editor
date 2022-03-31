import React, {useContext, useState} from 'react';
import {
  Flex,
  TextInput,
  IconButton,
  Select,
  Menu,
  Form,
  FormControl,
  Switch
} from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';
import { TableContext } from '../Field';
import {CellProps} from './TableTypes'


export const TypeSelector = (props: {rowIndex: number | undefined, cellIndex: number}) => {
  const {rowIndex, cellIndex} = props
  const {changeCellValue, rows, setRows} = useContext(TableContext)
  return (
    <Menu>
      <Menu.Trigger>
        <IconButton style={{height: '40px'}} icon={<icons.ArrowDownIcon />} aria-label={'open type selector'} size="small"/>
      </Menu.Trigger>
      <Menu.List>
        {['text','icon', 'collapsible'].map(type => {
          return (
            <Menu.Item
              key={`key-${type}`}
              onClick={() => {
                const newRows = changeCellValue(rows, rowIndex, cellIndex, type, 'type');
                setRows(newRows);
              }}
            >
              {type}
            </Menu.Item>
          )
        })}
      </Menu.List>
    </Menu>
  )
}

export const ColStyleMenu = (props: CellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Flex flexDirection='column'>
      <IconButton icon={<icons.ArrowDownIcon/>} onClick={() => setIsOpen(!isOpen)} aria-label='style menu'/>
      {isOpen && <ColumnStyleForm {...props}/>}
    </Flex>
  )
}

const WidthSelector = (props: CellProps) => {
  const {columns, changeColValue, setColumns} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Width</FormControl.Label>
      <TextInput
        value={content.width}
        onChange={(e) => {
          const newCols = changeColValue(columns, cellIndex, e.target.value, 'width');
          setColumns(newCols);
        }}
      />
    </FormControl>
  )
}

const FontSizeSelector = (props:CellProps) => {
  const {columns, changeColValue, setColumns} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Font Size</FormControl.Label>
      <Select
        id="optionSelect-controlled"
        name="fontSize-controller"
        value={content.fontSize}
        onChange={(e) => {
          const newCols = changeColValue(columns, cellIndex, e.target.value, 'fontSize');
          setColumns(newCols);
        }}
      >
        <Select.Option value="x-small)">x-small</Select.Option>
        <Select.Option value="small)">small</Select.Option>
        <Select.Option value="medium)">medium</Select.Option>
        <Select.Option value="large)">large</Select.Option>
        <Select.Option value="x-large)">x-large</Select.Option>
        <Select.Option value="xx-large)">xx-large</Select.Option>
      </Select>
    </FormControl>
  )
}

const FontWeightSelector = (props:CellProps) => {
  const {columns, changeColValue, setColumns} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Font Weight</FormControl.Label>
      <Select
        id="optionSelect-controlled"
        name="fontSize-controller"
        value={content.fontWeight}
        onChange={(e) => {
          const newCols = changeColValue(columns, cellIndex, e.target.value, 'fontWeight');
          setColumns(newCols);
        }}
      >
        <Select.Option value="normal">normal</Select.Option>
        <Select.Option value="semi-bold">semi-bold</Select.Option>
        <Select.Option value="extra-bold">extra-bold</Select.Option>
      </Select>
    </FormControl>
  )
}

const TextAlignSelector = (props:CellProps) => {
  const {columns, changeColValue, setColumns} = useContext(TableContext);
  const {cellIndex, content} = props;
  return (
    <FormControl>
      <FormControl.Label>Text Align</FormControl.Label>
      <Select
        id="optionSelect-controlled"
        name="fontSize-controller"
        value={content.textAlign}
        onChange={(e) => {
          const newCols = changeColValue(columns, cellIndex, e.target.value, 'textAlign');
          setColumns(newCols);
        }}
      >
        <Select.Option value="left">left</Select.Option>
        <Select.Option value="center">center</Select.Option>
        <Select.Option value="right">right</Select.Option>
      </Select>
    </FormControl>
  )
}

const IsSelectedColumn = (props: CellProps) => {
  const {columns, changeColValue, setColumns} = useContext(TableContext);
  const {cellIndex, content} = props;
  const selectedColumn = content.selectedColumn ? JSON.parse(content.selectedColumn) : false;
  return (
    <FormControl>
      <Switch
        name="allow-cookies-controlled"
        id="allow-cookies-controlled"
        isChecked={selectedColumn}
        onChange={(e) => {
          const newCols = changeColValue(columns, cellIndex, !selectedColumn, 'selectedColumn');
          setColumns(newCols);
        }}
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
