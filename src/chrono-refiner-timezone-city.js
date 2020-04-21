import chrono from 'chrono-node';

var CityRefiner = new chrono.Refiner();

CityRefiner.refine = function(text, results) {

  let cityRegex = new RegExp("Tokyo|Melbourne|Japan");
  let cityMap = {
    'Melbourne' : 'Australia/Melbourne',
    'Japan'     : 'Asia/Tokyo',
    'Tokyo'     : 'Asia/Tokyo',
  };

  results.forEach(function(result) {
    let match;

    if ((match = cityRegex.exec(text)) !== null) {
      let city = match[0];
      result.start.assign('city', city);

      let timezone = cityMap[city];
      if (timezone) {
        result.start.assign('timezone', timezone);
      }
    }
  });

  return results;
}

export default CityRefiner;
