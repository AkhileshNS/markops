// External Modules
import React from 'react';
import {inject, observer} from 'mobx-react';

// Local Styles and Controller
import { AppContainer } from 'App/App.styles';
import Controller from 'App/App.controller';

// Global Functions and Components
import {derive} from 'global/functions';
import Router from 'global/components/Router/Router';

// Page Components
import Home from 'Home/Home';
import Info from 'Info/Info';

const App = ({trigger, currRoute}) => {
  return <AppContainer>
    {trigger ? <Controller /> : null}
    <Router 
      currRoute={currRoute}
      routes={[{
        name: /^\/all$/,
        component: Home
      },{
        name: /^\/all/,
        component: Info
      }]}
    />
  </AppContainer>;
}

const mapStoresToProps = derive({
  trigger: "appStore",
  currRoute: "appStore"
});
export {App};
export default inject(mapStoresToProps)(observer(App));
