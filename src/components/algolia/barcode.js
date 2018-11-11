import React from 'react';
import Scanner from '../../components/uielements/barcode'
import { connectSearchBox } from 'react-instantsearch/connectors';

export default connectSearchBox(Scanner);