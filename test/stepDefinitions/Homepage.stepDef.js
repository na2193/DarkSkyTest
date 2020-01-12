import {Given, When, Then} from 'cucumber';
import HomePage from '../page/HomePage';
import { expect, assert } from 'chai';

var currentTemp, timeLineArr;

Given(/^I navigate to darksky homepage$/, function() {
    HomePage.open();
});

When(/^I get all the time in the timeline$/, function() {
    timeLineArr = HomePage.getTimelineHours();
});

Then(/^I should verify they are incremented by 2 hours$/, function() {
    assert.isTrue(HomePage.validateIncrementBy2(timeLineArr));
});

Given(/^I am on the darksky homepage$/, function() { 
    var title = browser.getUrl();
    expect(title).to.equal('https://darksky.net/forecast/40.7127,-74.0059/us12/en');
});

When(/^I get the current temp$/, function() {
    currentTemp = HomePage.currentTemp.getText();
    currentTemp = currentTemp.split(' ')[0];
    currentTemp = currentTemp.replace('˚', '');
});

Then(/^I should verify it is not lower than the lowest value from the timeline temp$/, function() {
    HomePage.validateCurrentTempWithTimeline(currentTemp);
});

Then(/^I want to verify the temp is valid through the API$/, function() {
    HomePage.validateCurrentTempAPI(currentTemp, '67d6aac020fb58bdbd635673bac38b2f', '40.7127', '-74.0059');
});