// External Module
import React from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';

// Local Styles and functions
import { InfoContainer, TitleContainer, Title, StatsContainer } from './Info.styles';
import { getStats } from './Info.functions';
 
// Global Functions and Components
import { derive } from 'global/functions';
import Entry from "global/components/Entry/Entry";

// Module Components
import Output from './components/Output/Output';

const Info = ({data, selected}) => {
  let { batch, entries, selected: selectedEntry } = data[selected];
  let { courseCode, courseName, fileData } = entries[selectedEntry];
  let { contOutputs = [], avgOutputs } = getStats(_.cloneDeep(fileData));

  return <InfoContainer>
    <TitleContainer>
      <Title>{batch}</Title>
    </TitleContainer>
    <Entry selectable={false} data={["Course name", courseName, "Course code", courseCode]} />
    {contOutputs.length > 0 ? <StatsContainer>
      {contOutputs.map(({CO, PO, percentage}, i) => <Output
        CO={CO} PO={PO} percentage={percentage} key={`Stat (${i})`}
      />)}
    </StatsContainer> : null}
    {avgOutputs.length > 0 ? <StatsContainer>
      {avgOutputs.map(({CO, PO, percentage}, i) => <Output
        CO={CO} PO={PO} percentage={percentage} key={`Stat (${i})`}
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