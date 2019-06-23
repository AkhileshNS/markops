// External Modules
import React from 'react';
import {shallow} from 'enzyme';

// components
import Router from 'global/components/Router/Router';

const Foo = () => <div><p>Foo</p></div>;
const Bar = () => <div><p>Bar</p></div>;

describe('<Router />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Router 
      currRoute="foo"
      routes={[{
        name: /foo/i,
        component: Foo
      },{
        name: /bar/i,
        component: Bar
      }]}
    />);
  });

  it('should return the route matched by its name to currRoute', () => {
    expect(wrapper.matchesElement(<Foo />)).toBeTruthy();
  });

  it('should return the first matching route', () => {
    wrapper.setProps({
      currRoute: "/foo",
      routes: [{
        name: /^\/foo$/,
        component: Foo
      },{
        name: /^\/foo/,
        component: Bar
      }]
    });
    expect(wrapper.matchesElement(<Foo />)).toBeTruthy();
  });

  it('should return the next matching route', () => {
    wrapper.setProps({
      currRoute: "/foo/absolutely anything",
      routes: [{
        name: /^\/foo$/,
        component: Foo
      },{
        name: /^\/foo/,
        component: Bar
      }]
    });
    expect(wrapper.matchesElement(<Bar />)).toBeTruthy();
  });
});