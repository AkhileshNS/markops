import {Info} from './Info';

import { filterData } from './Info.functions';

describe('<Info />', () => {
  it('should have atleast one test', () => {
    expect(true).toBeTruthy();
  });

  it('should return a filtered array', () => {
    expect(filterData([
      [null, null, "BMS COllege of Engineering", null],
      ["markops","test1", null, null, "test2", null, null],
      ["Program Outcome", 1, 1, "1&2"],
      ["Course Outcome", 1, 1, "1&2"],
      ["END"]
    ])).toEqual([
      ["markops","test1", "test1", "test1", "test2", "test2", "test2"],
      ["Program Outcome", "1", "1", "1,2"],
      ["Course Outcome", "1", "1", "1,2"]
    ]);
  });
});