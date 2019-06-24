// External Modules
import React from 'react';

// Local Styles
import { BackdropContainer } from './Backdrop.styles';

export default function Backdrop({onClick}) {
  return <BackdropContainer onClick={onClick} />;
}