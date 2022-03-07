import React from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph } from '@contentful/forma-36-react-components';
import { DialogExtensionSDK, FieldExtensionSDK } from '@contentful/app-sdk';
import Field from './Field'

interface DialogProps {
  sdk: DialogExtensionSDK;
  fieldSdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

const Dialog = (props: DialogProps) => {
  return <Field cma={props.cma} sdk={props.fieldSdk}/>;
};

export default Dialog;
