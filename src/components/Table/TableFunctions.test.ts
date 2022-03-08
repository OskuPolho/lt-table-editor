import {
    changeColValue,
    changeCellValue,
    deleteColumn,
    deleteRow,
    addRow,
    addNewColumn,

} from './TableFunctions'

let initRows: any = [];
let initColumns: any = [];

beforeEach(() => {
  initRows = [
      [
        {type: 'text', text: 'row1 text1'},
        {type: 'text', text: 'row1 text2'},
        {type: 'text', text: 'row1 text3'}
      ],
      [
        {type: 'text', text: 'row2 text1'},
        {type: 'text', text: 'row2 text2'},
        {type: 'text', text: 'row2 text3'}
      ],
      [
        {type: 'text', text: 'row3 text1'},
        {type: 'text', text: 'row3 text2'},
        {type: 'text', text: 'row3 text3'}
      ]
    ]
  
  initColumns = [
      {type: 'text', value: 'col1 heading'},
      {type: 'text', value: 'col2 heading'},
      {type: 'text', value: 'col3 heading'}
  ]
})

test('test change col value', () => {
  expect(changeColValue(initColumns, 1, 'test value', 'value')).toEqual(
    [
      {type: 'text', value: 'col1 heading'},
      {type: 'text', value: 'test value'},
      {type: 'text', value: 'col3 heading'}
    ]
  );
});

test('test change cell value', () => {
  expect(changeCellValue(initRows, 2, 1, 'test value', 'text')).toEqual(
    [
      [
        {type: 'text', text: 'row1 text1'},
        {type: 'text', text: 'row1 text2'},
        {type: 'text', text: 'row1 text3'}
      ],
      [
        {type: 'text', text: 'row2 text1'},
        {type: 'text', text: 'row2 text2'},
        {type: 'text', text: 'row2 text3'}
      ],
      [
        {type: 'text', text: 'row3 text1'},
        {type: 'text', text: 'test value'},
        {type: 'text', text: 'row3 text3'}
      ]
    ]
  );
});

test('test delete column', () => {
  expect(deleteColumn(initRows, initColumns, 1)).toEqual(
    {
      newRows: [
        [
          {type: 'text', text: 'row1 text1'},
          {type: 'text', text: 'row1 text3'}
        ],
        [
          {type: 'text', text: 'row2 text1'},
          {type: 'text', text: 'row2 text3'}
        ],
        [
          {type: 'text', text: 'row3 text1'},
          {type: 'text', text: 'row3 text3'}
        ]
      ],
      newColumns: [
        {type: 'text', value: 'col1 heading'},
        {type: 'text', value: 'col3 heading'}
      ]
    }
  );
});

test('test delete row', () => {
  expect(deleteRow(initRows, 1)).toEqual(
    [
      [
        {type: 'text', text: 'row1 text1'},
        {type: 'text', text: 'row1 text2'},
        {type: 'text', text: 'row1 text3'}
      ],
      [
        {type: 'text', text: 'row3 text1'},
        {type: 'text', text: 'row3 text2'},
        {type: 'text', text: 'row3 text3'}
      ]
    ]
  );
});

test('test add row', () => {
  expect(addRow(initRows)).toEqual(
    [
      [
        {type: 'text', text: 'row1 text1'},
        {type: 'text', text: 'row1 text2'},
        {type: 'text', text: 'row1 text3'}
      ],
      [
        {type: 'text', text: 'row2 text1'},
        {type: 'text', text: 'row2 text2'},
        {type: 'text', text: 'row2 text3'}
      ],
      [
        {type: 'text', text: 'row3 text1'},
        {type: 'text', text: 'row3 text2'},
        {type: 'text', text: 'row3 text3'}
      ],
      [
        {type: 'text', text: 'row3 text1'},
        {type: 'text', text: 'row3 text2'},
        {type: 'text', text: 'row3 text3'}
      ]
    ]
  );
});

test('test add column', () => {
  expect(addNewColumn(initRows, initColumns)).toEqual(
    {
      newRows: [
        [
          {type: 'text', text: 'row1 text1'},
          {type: 'text', text: 'row1 text2'},
          {type: 'text', text: 'row1 text3'},
          {type: 'text', text: 'row1 text3'}
        ],
        [
          {type: 'text', text: 'row2 text1'},
          {type: 'text', text: 'row2 text2'},
          {type: 'text', text: 'row2 text3'},
          {type: 'text', text: 'row2 text3'}
        ],
        [
          {type: 'text', text: 'row3 text1'},
          {type: 'text', text: 'row3 text2'},
          {type: 'text', text: 'row3 text3'},
          {type: 'text', text: 'row3 text3'}
        ],
      ],
      newColumns: [
        {type: 'text', value: 'col1 heading'},
        {type: 'text', value: 'col2 heading'},
        {type: 'text', value: 'col3 heading'},
        {type: 'text', value: 'col3 heading'}
      ]
    }
  );
});


