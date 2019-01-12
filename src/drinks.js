var _ = require('lodash');

function convertDrinkDBObjectsToJSON(drinks) {
    return JSON.stringify({drinks: _.reduce(drinks, (accumulator, drink, index) => {
        accumulator.push(_.pick(drink, ['drink_name', 'drink_id', 'bar_id', 'price']));
        return accumulator;
    }, [])});
}

module.exports = {
    convertDrinkDBObjectsToJSON
};