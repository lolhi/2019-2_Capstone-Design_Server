var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourBarrierFreeSchema = new Schema({
    // 기본
    CONTENT_ID: Number,         // Content id
    // 지체장애
    PARKING: String,            // 주차여부
    ROUTE: String,              // 대중교통
    PUBLICTRANSPORT: String,    // 접근로
    WHEELCHAIR: String,         // 휠체어 대여 가능 여부
    HANDICAPETC: String,        // 지체장애 기타 상세
    // 시각장애
    BRAILEBLOCK: String,        // 점자블록
    HELPDOG: String,            // 보조견동반
    GUIDEHUMAN: String,         // 안내요원
    AUDIOGUIDE: String,         // 오디오가이드
    BIGPRINT: String,           // 큰활자 홍보물
    BRAILEPROMOTION: String,    // 점자홍보물
    GUIDESYSTEM: String,        // 유도안내 설비
    BLINDHANDICAPETC: String,   // 시각장애 기타상세
    // 청각장애
    SIGNGUIDE: String,          // 수화가이드
    VIDEOGUIDE: String,         // 비디오가이드
    HEARINGHANDICAPETC: String, // 청각장애 기타상세
    // 영유아가족
    STROLLER: String,           // 유모차
    LACTATIONROOM: String,      // 수유실
    BABYSPARECHAIR: String,     // 유아용보조의자
    IMFANTSFAMILYETC: String    // 영유아 가족 기타상세
});

module.exports = mongoose.model('tour_barrierfree', tourBarrierFreeSchema);