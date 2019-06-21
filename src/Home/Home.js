// External Modules
import React from 'react';
import { inject, observer } from 'mobx-react';

// Local Styles
import { HomeContainer } from 'Home/Home.styles';

// Global Functions
import { derive } from 'global/functions';

const Home = props => {
  return (
    <HomeContainer>
      <p>Home Screen</p>
    </HomeContainer>
  );
};

const mapStoresToProps = derive({});

export { Home };
export default inject(mapStoresToProps)(observer(Home));
