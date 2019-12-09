var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail15Schema = new Schema({
    // 기본
    CONTENT_ID: Number,         // Content id
    CONTENT_TYPE: Number,       // Content type id
    // contentTypeId=15 (축제)
    AGELIMIT: String,           // 관람 가능연령
    BOOKINGPLACE: String,       // 예매처
    EVENTSTARTDATE: String,     // 행사 시작일
    EVENTENDDATE: String,       // 행사 종료일
    EVENTHOMEPAGE: String,      // 행사 홈페이지
    EVENTPLACE: String,         // 행사 장소
    PLACEINFO: String,          // 행사장 위치안내
    PROGRAM: String,            // 행사 프로그램
    SUBEVENT: String,           // 부대행사
    USETIMEFESTIVAL: String     // 이용요금
});

module.exports = mongoose.model('tour_detail15', tourDetail15Schema);