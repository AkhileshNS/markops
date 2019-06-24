// External Modules
import React from 'react';

// Local Styles
import { OutputContainer, OutputCO, OutputPO, OutputBar, OutputBarPercentage, OutputPercentage } from './Output.styles';

export default function Output({PO = "Program outcome 1", CO = "Course outcome 1", percentage = 77.755667}) {
  let Percentage = Math.round(percentage * 100) / 100;

  return <OutputContainer>
    <OutputPO>{PO}</OutputPO>
    <OutputCO>{CO}</OutputCO>
    <OutputBar>
      <OutputBarPercentage percentage={percentage} />
    </OutputBar>
    <OutputPercentage>{Percentage}%</OutputPercentage>
  </OutputContainer>;
}