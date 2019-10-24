var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail12Schema = new Schema({
     // 기본
     CONTENT_ID: Number,         // Content id
     CONTENT_TYPE: String,       // Content type id
     // contentTypeId=12 (관광지)
     

});

module.exports = mongoose.model('tour_detail12', tourDetail12Schema);