import ResultDataProperty from '../../../../BusinessData/ResultData/ResultDataProperty.js';

class ChaincodeModel {

    GetChaincodeName (log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{       
            $match: {
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                CHAINCODE_ID: 1,
                CHAINCODE_NAME: 1
            }
        },{
            $sort: {
                CHAINCODE_NAME: 1//ASC
            }
        }];

        Schema.ChaincodeSchema.aggregate(query, function(err, result) {
            
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
            $match: {
                CHAINCODE_ID: new RegExp(dataItem.CHAINCODE_ID),
                CHAINCODE_NAME: new RegExp(dataItem.CHAINCODE_NAME),
                IS_ACTIVE: true
            },
        },{
            $project: {
                _id: 0,
                CHAINCODE_ID: 1,
                CHAINCODE_NAME: 1,
                CHAINCODE_VERSION: 1,
                CREATE_BY: 1,
                UPDATE_BY: 1,
                CREATE_DATE: { $dateToString: { format: "%Y/%m/%d %H:%M:%S", date: "$CREATE_DATE" }},
                UPDATE_DATE: { $dateToString: { format: "%Y/%m/%d %H:%M:%S", date: "$UPDATE_DATE" }}
            }
        },{
            $sort: {
                CHAINCODE_NAME: 1//ASC
            },
        },{
            $skip: parseInt(dataItem.Start || 0),
        },{
            $limit: parseInt(dataItem.Limit || 1)
        }];

        Schema.ChaincodeSchema.aggregate(query, function(err, result) {
            
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

        let schema = new Schema.ChaincodeSchema();

        schema.CHAINCODE_ID = schema.id;
        schema.CHAINCODE_NAME = dataItem.CHAINCODE_NAME;
        schema.CHAINCODE_VERSION = dataItem.CHAINCODE_VERSION;

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

        schema.CHAINCODE_NAME = dataItem.CHAINCODE_NAME;
        schema.CHAINCODE_VERSION = dataItem.CHAINCODE_VERSION;

        schema.UPDATE_BY = dataItem.UPDATE_BY || 'System';
        schema.UPDATE_DATE = (new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60000);
        
        Schema.ChaincodeSchema.findOneAndUpdate({ CHAINCODE_ID: dataItem.CHAINCODE_ID }, { $set: schema }, function(err) {

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
        
        Schema.ChaincodeSchema.findOneAndUpdate({ CHAINCODE_ID: dataItem.CHAINCODE_ID }, { $set: schema }, function(err) {

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

export default ChaincodeModel;