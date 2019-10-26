var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourDetail32Schema = new Schema({
    // 기본
    CONTENT_ID: Number,         // Content id
    CONTENT_TYPE: Number,       // Content type id
    // contentTypeId=32 (숙박)
    CHECKINTIME: String,        // 체크인 시간
    CHECKOUTTIME: String,       // 체크아웃 시간
    CHKCOOKING: String,         // 객실내 취사여부
    INFOCENTER: String,         // 문의 및 안내(infocenterlodging)
    PARKING: String,            // 주차시설(parkinglodging)
    RESERVATIONURL: String,     // 예약안내 URL
    // 부대시설
    BARBECUE: Number,           // 바베큐장
    BEAUTY: Number,             // 뷰티시설
    BEVERAGE: Number,           // 식음료장
    BICYCLE: Number,            // 자전거 대여
    CAMPFIRE: Number,           // 캠프파이어
    FITNESS: Number,            // 휘트니스 센터
    KARAOKE: Number,            // 노래방
    PUBLICBATH: Number,         // 공용사워실
    PUBLICPC: Number,           // 공용 PC
    SAUNA: Number,              // 사우나
    SEMINAR: Number,            // 세미나실
    SPORTS: Number,             // 스포츠 시설
    REFUNDREFULATION: String,   // 환불규정
});

module.exports = mongoose.model('tour_detail32', tourDetail32Schema);