import React, {useContext} from 'react';
import {TableContext} from '../Field';
import Row from './Row'
import {CellContent} from './TableTypes'
import {
  Flex,
  IconButton,
} from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';

const Table = () => {
  const {addRow, rows, columns, setRows} = useContext(TableContext)
  return (
      <Flex>
        <Flex flexDirection='column' flexGrow={6}>
          <Row cells={columns} />
          {rows.map((row: CellContent[], index: number) => <Row key={`key-row_${index}`} cells={row} rowIndex={index}></Row>)}
          <div style={{marginTop: '5px', width: '100%'}}>
            <IconButton
              icon={<icons.PlusCircleIcon/>}
              onClick={() => {
                  const newRows = addRow(rows);
                  setRows(newRows);
                }
              }
              aria-label={'plus'}
              isFullWidth={true}
            />
          </div>
        </Flex>
      </Flex>
  )
}

export default Table;
