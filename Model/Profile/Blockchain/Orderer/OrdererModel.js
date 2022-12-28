import ResultDataProperty from '../../../../BusinessData/ResultData/ResultDataProperty.js';

class OrdererModel {

    GetOrdererName (log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{       
            $match: {
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                ORDERER_ID: 1,
                ORDERER_NAME: 1
            }
        },{
            $sort: {
                ORDERER_NAME: 1//ASC
            }
        }];

        Schema.OrdererSchema.aggregate(query, function(err, result) {
            
            if (!err) {

                if(result.length > 0) {

                    resultData.Set(20000, result);

                }
                else {
                    
                    log.Error('Data not found');

                    resultData.Set(40400);

                }

                callback(resultData);
            }
            else {

                log.Error(err.message);

                resultData.Set(50000);

                callback(resultData);
            }

        });
    }

    GetOrdererNameByNetworkName (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{
            $lookup:{
                from: "networks",
                localField: "NETWORK_ID",
                foreignField: "NETWORK_ID",
                as: "NETWORK_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$NETWORK_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $match: {
                NETWORK_NAME: new RegExp(dataItem.NETWORK_NAME),
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                ORDERER_ID: 1,
                ORDERER_NAME: 1
            }
        },{
            $sort: {
                ORDERER_NAME: 1//ASC
            }
        }]

        Schema.OrdererSchema.aggregate(query, function(err, result) {
            
            if (!err) {

                if(result.length > 0) {

                    resultData.Set(20000, result);

                }
                else {
                    
                    log.Error('Data not found');

                    resultData.Set(40400);

                }

                callback(resultData);
            }
            else {

                log.Error(err.message);

                resultData.Set(50000);

                callback(resultData);
            }

        });
    }

    Search (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{
            $lookup:{
                from: "networks",
                localField: "NETWORK_ID",
                foreignField: "NETWORK_ID",
                as: "NETWORK_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$NETWORK_DOC", 0 ] }, "$$ROOT" ] } }
        },{ 
            $match: {
                NETWORK_ID: new RegExp(dataItem.NETWORK_ID),
                NETWORK_NAME: new RegExp(dataItem.NETWORK_NAME),
                ORDERER_ID: new RegExp(dataItem.ORDERER_ID),
                ORDERER_NAME: new RegExp(dataItem.ORDERER_NAME),
                IS_ACTIVE: true
            },
        },{
            $project: {
                _id: 0,
                NETWORK_ID: 1,
                NETWORK_NAME: 1,

                ORDERER_ID: 1,
                ORDERER_NAME: 1,

                HOST: 1,
                PORT: 1,

                CREATE_BY: 1,
                UPDATE_BY: 1,
                CREATE_DATE: { $dateToString: { format: "%Y/%m/%d %H:%M:%S", date: "$CREATE_DATE" }},
                UPDATE_DATE: { $dateToString: { format: "%Y/%m/%d %H:%M:%S", date: "$UPDATE_DATE" }},
            }
        },{
            $sort: {
                ORDERER_NAME: 1//ASC
            },
        },{
            $skip: parseInt(dataItem.Start || 0),
        },{
            $limit: parseInt(dataItem.Limit || 1)
        }];

        Schema.OrdererSchema.aggregate(query, function(err, result) {
            
            if (!err) {

                if(result.length > 0) {

                    resultData.Set(20000, result);

                }
                else {
                    
                    log.Error('Data not found');

                    resultData.Set(40400);
                    
                }

                callback(resultData);
            }
            else {

                log.Error(err.message);

                resultData.Set(50000);

                callback(resultData);
            }

        });
    }

    Insert (dataItem, log, callback) {
        
        let resultData = new ResultDataProperty();

        let schema = new Schema.OrdererSchema();

        schema.NETWORK_ID = dataItem.NETWORK_ID;

        schema.ORDERER_ID = schema.id;
        schema.ORDERER_NAME = dataItem.ORDERER_NAME;

        schema.HOST = dataItem.HOST;
        schema.PORT = dataItem.PORT;

        schema.IS_ACTIVE = true;
        schema.CREATE_BY = dataItem.CREATE_BY || 'System';
        schema.CREATE_DATE = (new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60000);
        schema.UPDATE_BY = null;
        schema.UPDATE_DATE = null;

        schema.save(function (err) {
            
            if (!err) {

                log.Info('Insert data success');

                resultData.Set(20200);

                callback(resultData);

            }
            else {

                log.Error(err.message);

                resultData.Set(50000);

                callback(resultData);

            }
        });

    }

    Update (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let schema = {};

        schema.NETWORK_ID = dataItem.NETWORK_ID;

        schema.ORDERER_NAME = dataItem.ORDERER_NAME;

        schema.HOST = dataItem.HOST;
        schema.PORT = dataItem.PORT;

        schema.UPDATE_BY = dataItem.UPDATE_BY || 'System';
        schema.UPDATE_DATE = (new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60000);
        
        Schema.OrdererSchema.findOneAndUpdate({ ORDERER_ID: dataItem.ORDERER_ID }, { $set: schema }, function(err) {

            if (!err) {

                log.Info('Update data success');

                resultData.Set(20200);

                callback(resultData);

            }
            else {

                log.Error(err.message);

                resultData.Set(50000);

                callback(resultData);

            }
        });
    }

    Delete (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let schema = {};

        schema.IS_ACTIVE = false;

        schema.UPDATE_BY = dataItem.UPDATE_BY || 'System';
        schema.UPDATE_DATE = (new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60000);
        
        Schema.OrdererSchema.findOneAndUpdate({ ORDERER_ID: dataItem.ORDERER_ID }, { $set: schema }, function(err) {

            if (!err) {

                log.Info('Delete data success');

                resultData.Set(20200);

                callback(resultData);

            }
            else {

                log.Error(err.message);

                resultData.Set(50000);

                callback(resultData);

            }
        });
    }

};

export default OrdererModel;