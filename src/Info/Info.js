// External Module
import React from 'react';
import { inject, observer } from 'mobx-react';

// Local Styles
import { InfoContainer, TitleContainer, Title } from 'Info/Info.styles';
 
// Global Functions and Components
import { derive } from 'global/functions';
import Entry from "global/components/Entry/Entry";

const Info = ({data, selected}) => {
  let { name, entries, selected: selectedEntry } = data[selected];
  let { courseCode, courseName, facultyName, fileData } = entries[selectedEntry];

  return <InfoContainer>
    <TitleContainer>
      <Title>{name.replace("AY","Academic Year")}</Title>
    </TitleContainer>
    <Entry selectable={false} data={["Course name", courseName, "Course code", courseCode]} />
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