// External Module
import React from 'react';
import { inject, observer } from 'mobx-react';

// Local Styles
import { InfoContainer } from 'Info/Info.styles';
 
// Global Functions
import { derive } from 'global/functions';

const Info = props => {
  return <InfoContainer>
    <p>Info</p>
  </InfoContainer>
};

const mapStoresToProps = derive({
  currRoute: "appStore",
  setRoute: "appStore"
});
export {Info}
export default inject(mapStoresToProps)(observer(Info));