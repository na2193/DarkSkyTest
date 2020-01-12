import BasePage from './BasePage';
import { expect, assert } from 'chai';
import request from 'request';

class HomePage extends BasePage {
    open() {
        super.open('/forecast/40.7127,-74.0059/us12/en');
    }

    get timeline() { return $('.hours'); }

    get currentTemp() { return $('//*[@id="title"]/span[1]/span[2]/span[1]'); }

    get timelineTemps() { return $('.temps'); }

    validateCurrentTempAPI(currentTemp, key, latitude, longitude) {
        request('https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // converting to json and rounding the current temperature in the api
                var json = JSON.parse(body);
                var jsonCurrentTemp = Math.round(json.currently.temperature);
                expect(parseInt(currentTemp)).to.equals(jsonCurrentTemp);
          }
        });
    }

    validateCurrentTempWithTimeline(currentTemp) {
        let timelineTemps = this.timelineTemps;
        let timelineArr = timelineTemps.getText().split('\n');
        let modifiedTempArr = [];
        // removing degree symbol and converting to Integer
        for(var i = 0; i < timelineArr.length; i++) {
            let temp = timelineArr[i].replace('°', '');
            temp = parseInt(temp);
            modifiedTempArr.push(temp);
        }
        // using Math library for min and max
        let lowestTimelineTemp = Math.min(...modifiedTempArr);
        let highestTimelineTemp = Math.max(...modifiedTempArr);

        assert.isAtLeast(parseInt(currentTemp), lowestTimelineTemp, 
            currentTemp + ' is more than or equal to ' + lowestTimelineTemp);
 
        assert.isAtMost(parseInt(currentTemp), highestTimelineTemp, 
            currentTemp + ' is less than or equal to ' + highestTimelineTemp);
    }

    // mapping to 24 hour time and looping over to see if increment by 2
    validateIncrementBy2(data) {
        const hours = data.map(t => t === '12am' ? 0 : t === '12pm' ? 12 : (t.includes('pm') ? 12 : 0) + parseInt(t));
        return hours.every((h, i, a) => {
          var next = (h % 24 + 2) % 24;
          return a[i + 1] === undefined || a[i + 1] === next;
        });
    }

    getTimelineHours() {
        let timeline = this.timeline;

        // storing the timeline data into an array
        let timelineArr = timeline.getText().split('\n');
        
        // creating a new array to remove the first element which is now
        let modifiedTempArr = [];
        for(var i = 1; i < timelineArr; i++) {
           modifiedTempArr.push(timelineArr[i]);
        }
        return modifiedTempArr;
    } 
}

export default new HomePage();