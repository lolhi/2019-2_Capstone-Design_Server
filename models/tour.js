var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
    // 기본
    CONTENT_ID: Number,         // Content id
    CONTENT_TYPE: Number,       // Content type id
    // 기본정보 조회(defaultYN)
    HOMEPAGE: String,           // 홈페이지
    TEL: String,                // 번호
    TITLE: String,              // 장소이름
    // 대표이미지 조회(firstImageYN)
    REPRESNET_IMG: String,      // 대표이미지
    THUMBNAIL: String,          // 썸네일
    // 주소정보 조회(addrinfoYN)
    TOUR_ADDR: String,          // 주소
    // 좌표정보 조회(mapinfoYN)
    LATITUDE: Number,           // 위도
    LONGITUDE: Number,          // 경도
    // 개요조회(overviewYN)
    OVERVIEW: String            // 개요
});

module.exports = mongoose.model('tour', tourSchema);