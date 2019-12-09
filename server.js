var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var config = require('./config');

var tourDB = require('./models/tour');
var tourDetail12DB = require('./models/tour_detail12');
var tourDetail14DB = require('./models/tour_detail14');
var tourDetail15DB = require('./models/tour_detail15');
var tourDetail39DB = require('./models/tour_detail39');
var tourBarrierFreeDB = require('./models/tour_barrierfree');

var totalCnt = 0;
var totalSum = 0;
var out = 0;
// Setting Mongoose
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// Start Mongoose
mongoose.connect(config.dburi, { useNewUrlParser: true });

// Setting express
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

// start express server 
var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080");
});

var router = require('./router/router')(app, request, config, tourDB, tourBarrierFreeDB);

// Make tour database using tour API
//InitDatabase();

function InitDatabase(){
    //DB 삭제
    /*
    tourDB.remove(function(err, output){
		if(err) {
			console.log('error: database remove failure'); 
			return;
		}
		tourDetail12DB.remove(function(err, output){
            if(err) {
                console.log('error: database remove failure'); 
                return;
            }
            tourDetail14DB.remove(function(err, output){
                if(err) {
                    console.log('error: database remove failure'); 
                    return;
                }
                tourDetail15DB.remove(function(err, output){
                    if(err) {
                        console.log('error: database remove failure'); 
                        return;
                    }
                    tourDetail39DB.remove(function(err, output){
                        if(err) {
                            console.log('error: database remove failure'); 
                            return;
                        }
                        tourBarrierFreeDB.remove(function(err, output){
                            if(err) {
                                console.log('error: database remove failure'); 
                                return;
                            }
                            console.log('db remove success');
                            MakeDatabase(1);
                        });
                    });
                });
            });
        });
    });
    */
   //MakeDatabase(10);
   //MakeDatabase(19);
   //MakeDatabase(28);13번해야함
   //MakeDatabase(37);
}

function MakeDatabase(pageNumber){
    const option = MakeRequestOption('areaBasedList', {pageNo: pageNumber});
    CallAreaBasedListAPI(option)
        .then(function(jsonStr){
            MakeTourDetailDatabase(jsonStr, 'detailCommon', 0, 0, tourDB, {contentId: jsonStr[0].contentid, defaultYN: 'Y', firstImageYN: 'Y', addrinfoYN: 'Y', mapinfoYN: 'Y', overviewYN: 'Y'})
            .then(function(){
                console.log('pageNum: '+ pageNumber + ' Finish')
                /*
                totalCnt = totalCnt - 100;
                if(totalCnt > 0)
                    MakeDatabase(pageNumber + 1);
                else
                    console.log('totalSum: ' + totalSum);
                */
                out += 100;
                if(out < 1400)
                    MakeDatabase(pageNumber + 1);
                else
                    console.log('totalSum: ' + totalSum + 'pageNumber: ' + pageNumber);
                return;
            }, function(errMsg){
                console.log(errMsg);
                return;
            });
        }, function(errMsg){
            //실패
            console.log(errMsg);
		});
}

function CallAreaBasedListAPI(option){
    return new Promise(async function(resolve, reject){
        CallRequestLibrary(option)
        .then(function(result){
            if(totalCnt == 0)
                totalCnt = result.totalCount;
            var jsondata = result.items.item;
                for(var i = 0; i < jsondata.length; i++){
                    if(jsondata[i].contenttypeid == 32 || jsondata[i].contenttypeid == 28 ||
                        jsondata[i].contenttypeid == 38){
                            jsondata.splice(i,1);
                            i--;
                    }
                }
                totalSum = totalSum + jsondata.length;
                resolve(jsondata);
        }, function(msg){
            reject(msg);
        });
    });
}

function CallRequestLibrary(option){
    return new Promise(async function(resolve, reject){
        request(option, function (error, response, body) {
            if(error){
                reject('CallDetailWithTourPromise: request module error : ' + error);
                return;
            }
            if(response.statusCode == 200){
                var jsondata = JSON.parse(body);
                if(jsondata.response.header.resultCode == '0000'){
                    if(/areaBasedList/.test(option.url))
                        resolve(jsondata.response.body);
                    else
                        resolve(jsondata.response.body.items.item);
                    return;
                }
                else{
                    reject('CallDetailWithTourPromise: API error : ' + jsondata.response.header.resultMsg);
                    return;
                }
            }
        });
    });
}

function MakeTourDetailDatabase(jsonStr, tourAPIOperation, idx, idx1, db, query){
    return new Promise(async function(resolve, reject){
        const option = MakeRequestOption(tourAPIOperation, query);
        CallTourAPIOperationPromise(option, db, tourAPIOperation, jsonStr[idx].readcount)
        .then(function(){
            if(idx % 20 == 0 && idx1 == 1)
                console.log(idx + 'th data save in db')
            if(idx == jsonStr.length - 1 && idx1 == 1){
                resolve();
                return;
            }
            else if(idx1 == 0){
                MakeTourDetailDatabase(jsonStr, 'detailWithTour', idx, idx1 + 1, tourBarrierFreeDB, {contentId: jsonStr[idx].contentid})
                .then(function(){
                    resolve();
                    return;
                }, function(errMsg){
                    reject(errMsg);
                    return;
                });
                return;
            }
            /*
            else if(idx1 == 1){
                MakeTourDetailDatabase(jsonStr, 'detailIntro', idx, idx1 + 1,tourDetail12DB,{contentId: jsonStr[idx].contentid, contentTypeId: jsonStr[idx].contenttypeid})
                .then(function(){
                    resolve();
                    return;
                }, function(errMsg){
                    reject(errMsg);
                    return;
                });
            }
            */
            else if(idx1 == 1){
                MakeTourDetailDatabase(jsonStr, 'detailCommon', idx + 1, 0, tourDB, {contentId: jsonStr[idx + 1].contentid, defaultYN: 'Y', firstImageYN: 'Y', addrinfoYN: 'Y', mapinfoYN: 'Y', overviewYN: 'Y'})
                .then(function(){
                    resolve();
                    return;
                }, function(errMsg){
                    reject(errMsg);
                    return;
                });
            }
        }, function(errMsg){
            //실패
            reject(errMsg);
        });
    });
}

function MakeRequestOption(tourAPIOperation, queryStr){
    return {
        url: 'http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/' + tourAPIOperation,
        method: 'GET',
        qs: Object.assign({
            ServiceKey: config.ServiceKey,
            numOfRows: 100,
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            _type: 'json'
        }, queryStr),
        qsStringifyOptions: {
            encode: false
        }
    }
}

function CallTourAPIOperationPromise(option, db, tourAPIOperation, readCount){
    return new Promise(async function(resolve, reject){
        CallRequestLibrary(option)
        .then(function(result){
            var jsondata = result;
            var schema = MakeSchemaObject(tourAPIOperation, jsondata, readCount);
            var newTourData = new db(schema);
    
            newTourData.save(function(err){
                if(err){
                    reject('CallDetailCommonPromise: mongoose save function err: ' + err);
                    return;
                }
                resolve();
            });
        }, function(msg){
            reject(msg);
        });
    });
}

function MakeSchemaObject(tourAPIOperation, jsondata, readCount){
    if(tourAPIOperation == 'detailCommon') {
        return {
            // 기본
            CONTENT_ID: nvl(jsondata.contentid, -2147483648),             // Content id
            CONTENT_TYPE: nvl(jsondata.contenttypeid, -2147483648),       // Content type id
            // 기본정보 조회(defaultYN)
            HOMEPAGE: nvl(jsondata.hompage, ''),                          // 홈페이지
            TEL: nvl(jsondata.tel, ''),                                   // 번호
            TITLE: nvl(jsondata.title, ''),                               // 장소이름
            // 대표이미지 조회(firstImageYN)
            REPRESENT_IMG: nvl(jsondata.firstimage, ''),                  // 대표이미지
            THUMBNAIL: nvl(jsondata.firstimage2, ''),                     // 썸네일
            // 주소정보 조회(addrinfoYN)
            TOUR_ADDR: nvl(jsondata.addr1, ''),                           // 주소
            // 좌표정보 조회(mapinfoYN)
            LATITUDE: nvl(jsondata.mapy, ''),                             // 위도
            LONGITUDE: nvl(jsondata.mapx, ''),                            // 경도
            // 개요조회(overviewYN)
            OVERVIEW: nvl(jsondata.overview, ''),                         // 개요
            READCOUNT: nvl(readCount, -2147483648)                // 조회수
        };
    }
    else if(tourAPIOperation == 'detailIntro'){
        return {
            /*
            // 기본
            CONTENT_ID: nvl(jsondata.contentid, -2147483648),             // Content id
            CONTENT_TYPE: nvl(jsondata.contenttypeid, -2147483648),       // Content type id
            // contentTypeId=15 (축제)
            AGELIMIT: nvl(jsondata.agelimit, ''),                         // 관람 가능연령
            BOOKINGPLACE: nvl(jsondata.bookingplace, ''),                 // 예매처
            EVENTSTARTDATE: nvl(jsondata.eventstartdate, ''),             // 행사 시작일
            EVENTENDDATE: nvl(jsondata.eventenddate, ''),                 // 행사 종료일
            EVENTHOMEPAGE: nvl(jsondata.eventhomepage, ''),               // 행사 홈페이지
            EVENTPLACE: nvl(jsondata.eventplace, ''),                     // 행사 장소
            PLACEINFO: nvl(jsondata.placeinfo, ''),                       // 행사장 위치안내
            PROGRAM: nvl(jsondata.program, ''),                           // 행사 프로그램
            SUBEVENT: nvl(jsondata.subevent, ''),                         // 부대행사
            USETIMEFESTIVAL: nvl(jsondata.usetimefestival, ''),           // 이용요금
            */
        };
    }
    else if(tourAPIOperation == 'detailWithTour'){
        return {
            // 기본
            CONTENT_ID: nvl(jsondata.contentid, -2147483648),         
            // 지체장애
            PARKING: nvl(jsondata.parking, ''),                     
            ROUTE: nvl(jsondata.route, ''),              
            PUBLICTRANSPORT: nvl(jsondata.publictransport, ''),    
            WHEELCHAIR: nvl(jsondata.wheelchair, ''),         
            HANDICAPETC: nvl(jsondata.handicapetc, ''),        
            // 시각장애
            BRAILEBLOCK: nvl(jsondata.braileblock, ''),       
            HELPDOG: nvl(jsondata.helpdog, ''),            
            GUIDEHUMAN: nvl(jsondata.guidehuman, ''),         
            AUDIOGUIDE: nvl(jsondata.audioguide, ''),         
            BIGPRINT: nvl(jsondata.bigprint, ''),          
            BRAILEPROMOTION: nvl(jsondata.brailepromotion, ''),    
            GUIDESYSTEM: nvl(jsondata.guidesystem, ''),        
            BLINDHANDICAPETC: nvl(jsondata.blindhandicapetc, ''),   
            // 청각장애
            SIGNGUIDE: nvl(jsondata.signguide, ''),          
            VIDEOGUIDE: nvl(jsondata.videoguide, ''),         // 비디오가이드
            HEARINGHANDICAPETC: nvl(jsondata.hearinghandicapetc, ''), // 청각장애 기타상세
            // 영유아가족
            STROLLER: nvl(jsondata.stroller, ''),           // 유모차
            LACTATIONROOM: nvl(jsondata.lactationroom, ''),      // 수유실
            BABYSPARECHAIR: nvl(jsondata.babysparechair, ''),     // 유아용보조의자
            IMFANTSFAMILYETC: nvl(jsondata.infantsfamilyetc, '')    // 영유아 가족 기타상세
        };
    }
}

/**
 *문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * @param str           : 체크할 문자열
 * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
 */
function nvl(str, defaultStr){
    if(typeof str == "undefined" || str == null || str == "")
        str = defaultStr ;
         
    return str ;
}