import {
    changeColValue,
    changeCellValue,
    deleteColumn,
    deleteRow,
    addRow,
    addNewColumn,

} from './TableFunctions'

const initRows = [
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

const initColumns = [
    {type: 'text', value: 'col1 heading'},
    {type: 'text', value: 'col2 heading'},
    {type: 'text', value: 'col3 heading'}
]

test('test change col value', () => {
  expect(changeColValue(initColumns, 1, 'test value', 'value')).toBe(
    [
      {type: 'text', value: 'col1 heading'},
      {type: 'text', value: 'test value'},
      {type: 'text', value: 'col3 heading'}
    ]
  );
});

test('test change cell value', () => {
  expect(changeCellValue(initRows, 2, 1, 'test value', 'text')).toBe(
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

test('test change cell value', () => {
  expect(deleteColumn(initRows, initColumns, 1)).toBe(
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

test('test change cell value', () => {
  expect(deleteRow(initRows, 1)).toBe(
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

test('test change cell value', () => {
  expect(addRow(initRows)).toBe(
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

test('test change cell value', () => {
  expect(addNewColumn(initRows, initColumns)).toBe(
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


