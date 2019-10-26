var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail14Schema = new Schema({
    // 기본
    CONTENT_ID: Number,           // Content id
    CONTENT_TYPE: Number,         // Content type id
    // contentTypeId=14 (문화시설)
    CHKBABYCARRIAGE: String,      // 유모차 대여 여부(chkbabycarriageculture)
    CHKPET: String,               // 애완동물 가능 여부(chkpetculture)
    INFOCENTER: String,           // 문의 및 안내(infocenterculture)
    PARKING: String,              // 주차시설(parkingculture)
    RESTDATE: String,             // 쉬는날(restdateculture)
    USEFEE: String,               // 이용요금
    USETIME: String               // 이용시간(usetimeculture)
});

module.exports = mongoose.model('tour_detail14', tourDetail14Schema);