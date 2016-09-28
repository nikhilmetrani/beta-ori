/**
* Copyright 2016 - 29cu.io and the authors of beta-ori open source project

* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at

*     http://www.apache.org/licenses/LICENSE-2.0

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

describe('About', function () {

  beforeEach(function () {
    browser.get('/#/about');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('29cu.io');
  });

  it('should have <header>', function () {
    expect(element(by.css('bo-app header')).isPresent()).toEqual(true);
  });

  it('should have <main>', function () {
    expect(element(by.css('bo-app main')).isPresent()).toEqual(true);
  });

  it('should have <router-outlet>', function () {
    expect(element(by.css('bo-app main div router-outlet')).isPresent()).toEqual(true);
  });

  it('should have header About', function () {
    expect(element(by.css('bo-app main div h1')).getText()).toEqual('About');
  });

  it('should have header Project Team name', function () {
    expect(element(by.css('bo-app main div h3')).getText()).toEqual('SE23 Part Time team 2');
  });

  it('should have a repository links in <footer>', function () {
    expect(element(by.css('bo-app footer div')).getText()).toEqual('alpha-umi || beta-ori');
  });

});
