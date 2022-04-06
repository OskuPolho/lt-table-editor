import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlainClientAPI } from 'contentful-management';

export interface FieldProps {
    sdk: FieldExtensionSDK;
    cma: PlainClientAPI;
  }

export interface RowProps {
    cells: CellContent[],
    rowIndex?: number
}

export interface CellProps {
    cellIndex: number,
    rowIndex: number | undefined,
    content: CellContent
}

export interface CellContent {
    type: string,
    text?: string,
    heading?: string,
    value?: string,
    width?: string,
    fontSize?: string,
    fontWeight?: string,
    selectedColumn?: string,
    textAlign?: string
}