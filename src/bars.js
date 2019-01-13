var _ = require('lodash');

function convertDBBarObjectsToJSON(bars) {
    return JSON.stringify( _.reduce(bars, (accumulator, bar, index) => {
        accumulator.push(_.pick(bar, ['bar_id', 'bar_name']));
        return accumulator;
    }, []));
}

module.exports = {
    convertDBBarObjectsToJSON
};