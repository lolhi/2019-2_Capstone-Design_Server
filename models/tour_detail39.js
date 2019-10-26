var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail39Schema = new Schema({
    // 기본
    CONTENT_ID: Number,         // Content id
    CONTENT_TYPE: Number,       // Content type id
    // contentTypeId=39 (음식점)
    FIRSTMENU: String,          // 대표메뉴
    INFOCENTER: String,         // 문의 및 안내(infocenterfood)
    KIDFACILITY: Number,        // 어린이 놀이방 여부
    OPENTIME: String,           // 영업시간
    PACKING: String,            // 포장가능여부
    PARKING: String,            // 주차시설(parkingfood)
    RESERVATION: String,        // 예약안내(reservationfood)
    RESTDATE: String,           // 쉬는날(restdatefood)
    TREATMENU: String           // 취급메뉴\
});

module.exports = mongoose.model('tour_detail39', tourDetail39Schema);