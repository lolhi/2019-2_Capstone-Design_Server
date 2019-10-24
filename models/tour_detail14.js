var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail14Schema = new Schema({
    // 기본
    CONTENT_ID: Number,         // Content id
    CONTENT_TYPE: String,       // Content type id
});

module.exports = mongoose.model('tour_detail14', tourDetail14Schema);