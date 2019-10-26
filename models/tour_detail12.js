var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail12Schema = new Schema({
     // 기본
     CONTENT_ID: Number,           // Content id
     CONTENT_TYPE: Number,         // Content type id
     // contentTypeId=12 (관광지)
     CHKBABYCARRIAGE: String,      // 유모차 대여 여부
     CHKPET: String,               // 애완동물 가능 여부
     EXPAGERANGE: String,          // 체험가능 연령
     EXPGUIDE: String,             // 체험안내
     INFOCENTER: String,           // 문의 및 안내
     PARKING: String,              // 주차시설
     RESTDATE: String,             // 쉬는날
     USETIME: String               // 이용시간
});

module.exports = mongoose.model('tour_detail12', tourDetail12Schema);