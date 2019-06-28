// External Module
import React from 'react';
import { inject, observer } from 'mobx-react';

// Local Styles 
import { InfoContainer, TitleContainer, Title, StatsContainer, StatsTitle } from './Info.styles';
 
// Global Functions and Components
import { derive } from 'global/functions';
import Entry from "global/components/Entry/Entry";

// Module Components
import Output from './components/Output/Output';

const Info = ({data, selected}) => {
  let { batch, entries, selected: selectedEntry } = data[selected];
  let { courseCode, courseName, contOutputs = [], avgOutputs = [] } = entries[selectedEntry];

  return <InfoContainer>
    <TitleContainer>
      <Title>{batch}</Title>
    </TitleContainer>
    <Entry selectable={false} data={["Course name", courseName, "Course code", courseCode]} />
    {contOutputs.length > 0 ? <StatsContainer>
      <StatsTitle>Count Attainment</StatsTitle>
      {contOutputs.map(({CO, percentage}, i) => <Output
        CO={CO} percentage={percentage} key={`Stat (${i})`}
      />)}
    </StatsContainer> : null}
    {avgOutputs.length > 0 ? <StatsContainer>
      <StatsTitle>Average Attainment</StatsTitle>
      {avgOutputs.map(({CO, percentage}, i) => <Output
        CO={CO} percentage={percentage} key={`Stat (${i})`}
      />)}
    </StatsContainer> : null}
  </InfoContainer>
};

const mapStoresToProps = derive({
  currRoute: "appStore",
  setRoute: "appStore",
  data: "appStore",
  selected: "appStore"
});
export {Info}
export default inject(mapStoresToProps)(observer(Info));