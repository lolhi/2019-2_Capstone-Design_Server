module.exports = function(app, request, config, tourDB, tourBarrierFreeDB){
    // Test for express
    /*
    app.get('/', function(req, res){
        res.end('test');
    });
    */
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
}