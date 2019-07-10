// External Modules
import React from 'react';
import { observer, inject } from 'mobx-react';
import { IconContext } from 'react-icons';
import { MdKeyboardBackspace as Back } from 'react-icons/md'; 

// Local Styles
import { AppbarContainer, TitleContainer, Title } from './Appbar.styles';

// Global Functions
import { derive } from 'global/functions';

const Appbar = ({
  currRoute = "/all", 
  setRoute = route => console.log(route)
}) => {
  return <AppbarContainer>
    <TitleContainer>
      <Title>
        Markops
      </Title>
    </TitleContainer>
    {currRoute==="/all" ? null :
    <IconContext.Provider value={{size: "3.2em", className: "Icon"}}>
      <Back onClick={() => setRoute("/all")} />
    </IconContext.Provider>}
  </AppbarContainer>
};

const mapStoresToProps = derive({
  currRoute: 'appStore',
  setRoute: 'appStore'
});

export default inject(mapStoresToProps)(observer(Appbar));