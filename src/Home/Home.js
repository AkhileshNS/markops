// External Modules
import React from 'react';
import { inject, observer } from 'mobx-react';

// Local Styles
import { HomeContainer, TitleContainer, Title, AddButton, List } from 'Home/Home.styles';

// Global Functions and Components
import { derive } from 'global/functions';
import Entry from 'global/components/Entry/Entry';

const Home = ({
  data = [],
  selected = -1,
  currRoute, setRoute
}) => {
  return data.length!==0 && selected!==-1 ? (
    <HomeContainer>
      <TitleContainer>
        <Title>{data[selected].name.replace("AY","Academic Year")}</Title>
        <AddButton>Add new entry</AddButton>
      </TitleContainer>
      <List>
        <Entry />
      </List>
    </HomeContainer>
  ) : null;
};

const mapStoresToProps = derive({
  currRoute: "appStore",
  setRoute: "appStore",
  data: "appStore",
  selected: "appStore"
});

export { Home };
export default inject(mapStoresToProps)(observer(Home));
