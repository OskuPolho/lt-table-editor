import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlainClientAPI } from 'contentful-management';

export interface FieldProps {
    sdk: FieldExtensionSDK;
    cma: PlainClientAPI;
  }

export interface RowProps {
    cells: any[],
    rowIndex?: number
}

export interface CellProps {
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