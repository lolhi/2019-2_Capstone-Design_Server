module.exports = function(app, request, config, tourDB, tourBarrierFreeDB){
    // Test for express
    /*
    app.get('/', function(req, res){
        res.end('test');
    });
    */
   
    // check DB
    app.get('/tourDB', function(req, res){
        tourDB.count({}, function(err, count){
            if(err) console.log(err);
            console.log('tourDB : ' + count);
            tourDB.find({}, function(err, td){
                res.json(td);
            });
        });
    });

    app.get('/tourBarrierFree', function(req, res){
        tourBarrierFreeDB.count({}, function(err, count){
            if(err) console.log(err);
            console.log('tourDB : ' + count);
            tourBarrierFreeDB.find({}, function(err, tbd){
                res.json(tbd);
            });
        });
    });

    app.get('/MainActivity/:USERLAT/:USERLON', function(req, res){
        /*
         * 1. 위치 기반 10Km 이내, 없을 시 5Km씩 연장
         * 2. 인기 관광지
         */
        FindTourListUsingGPS(req.params.USERLAT, req.params.USERLON)
        .then(function(tourlist){
            var rtvalues = new Array();
            var obj = new Object();
            obj['tourlist'] = tourlist;
            rtvalues.push(obj);
            res.json(rtvalues);
        }, function(errMsg){
            console.log(errMsg);
        });
    });

    function FindTourListUsingGPS(userLat, userLon){
        return new Promise(async function(resolve, reject){
            tourDB.find({}, function(err, tb){
                if(err){
                    reject('MongoDB find method err: ' + err);
                    return;
                }
                var point = 15;
                var j = 0;
                var temp = new Array();
                for(; j < 5 && temp.length < 5; j++, point += 5){
                    var temp = new Array();
                    var i = 0;
                    for(; i < tb.length; i++){
                        if(tb[i].CONTENT_TYPE == 12 || tb[i].CONTENT_TYPE == 15) {
                            if(CalculDistance(userLat, userLon, tb[i].LATITUDE, tb[i].LONGITUDE) < point){
                                temp.push(tb[i]);
                            }
                        }
                    }
                }
                resolve(temp);
                return;
            });
        });
    }

    function CalculDistance(userLat, userLon, tourLat, tourLon){
        var diffLat = Math.abs(userLat - tourLat);
        var diffLon = Math.abs(userLon - tourLon);
        //console.log('diffLat: ' + diffLat + ', diffLon: ' + diffLon);

        var latSi = parseInt(diffLat);
        var latBun = parseInt((diffLat - latSi) * 60);
        var latCho = parseInt(((diffLat - latSi) * 60 - latBun) * 60);
        //console.log('latSi: ' + latSi + ', latBun: ' + latBun + ', latCho :' + latCho);

        var lonSi = parseInt(diffLon);
        var lonBun = parseInt((diffLon - lonSi) * 60);
        var lonCho = parseInt(((diffLon - lonSi) * 60 - lonBun) * 60);
        //console.log('lonSi: ' + lonSi + ', lonBun: ' + lonBun + ', latCho :' + lonCho);

        var a = latSi * 111 + latBun * 1.85 + latCho * 0.031;
        var b = lonSi * 88.8 + lonBun * 1.48 + lonCho * 0.025;
        //console.log('a: ' + a + ', b: ' + b);

        //console.log('Math.sqrt(Math.pow(a,2) + Math.pow(b,2)): ' + Math.sqrt(Math.pow(a,2) + Math.pow(b,2)))
        return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    }

    app.get('/SearchActivity', function(req, res){

    });

    app.get('/MapActivity', function(req, res){

    });


    app.get('/Search', function(req, res){
        req.query.SEARCHITEM
        tourDB.find({$or: [{TITLE: {$regex:req.query.SEARCHITEM}},
                            {TOUR_ADDR: {$regex: req.query.SEARCHITEM}}]}, 
                            function(err, tb){
            res.json(tb);
        });
    });
}