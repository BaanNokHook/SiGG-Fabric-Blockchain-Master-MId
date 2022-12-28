import ResultDataProperty from '../../../../BusinessData/ResultData/ResultDataProperty.js';

class PeerModel {

    GetPeerName (log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{       
            $match: {
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                PEER_ID: 1,
                PEER_NAME: 1
            }
        },{
            $sort: {
                PEER_NAME: 1//ASC
            }
        }];

        Schema.PeerSchema.aggregate(query, function(err, result) {
            
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

    GetPeerNameByOrdererName (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{
            $lookup:{
                from: "orderers",
                localField: "ORDERER_ID",
                foreignField: "ORDERER_ID",
                as: "ORDERER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $match: {
                ORDERER_NAME: new RegExp(dataItem.ORDERER_NAME),
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                PEER_ID: 1,
                PEER_NAME: 1
            }
        },{
            $sort: {
                PEER_NAME: 1//ASC
            }
        }]

        Schema.PeerSchema.aggregate(query, function(err, result) {
            
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

    GetPeerNameByMembershipName (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{
            $lookup:{
                from: "memberships",
                localField: "MEMBERSHIP_ID",
                foreignField: "MEMBERSHIP_ID",
                as: "MEMBERSHIP_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$MEMBERSHIP_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $match: {
                MEMBERSHIP_NAME: new RegExp(dataItem.MEMBERSHIP_NAME),
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                PEER_ID: 1,
                PEER_NAME: 1
            }
        },{
            $sort: {
                PEER_NAME: 1//ASC
            }
        }]

        Schema.PeerSchema.aggregate(query, function(err, result) {
            
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

    GetPeerNameByCondition (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{
            $lookup:{
                from: "orderers",
                localField: "ORDERER_ID",
                foreignField: "ORDERER_ID",
                as: "ORDERER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "memberships",
                localField: "MEMBERSHIP_ID",
                foreignField: "MEMBERSHIP_ID",
                as: "MEMBERSHIP_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$MEMBERSHIP_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $match: {
                ORDERER_NAME: new RegExp(dataItem.ORDERER_NAME),
                MEMBERSHIP_NAME: new RegExp(dataItem.MEMBERSHIP_NAME),
                IS_ACTIVE: true
            }
        },{
            $project: {
                _id: 0,
                PEER_ID: 1,
                PEER_NAME: 1
            }
        },{
            $sort: {
                PEER_NAME: 1//ASC
            }
        }]

        Schema.PeerSchema.aggregate(query, function(err, result) {
            
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
                from: "orderers",
                localField: "ORDERER_ID",
                foreignField: "ORDERER_ID",
                as: "ORDERER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "memberships",
                localField: "MEMBERSHIP_ID",
                foreignField: "MEMBERSHIP_ID",
                as: "MEMBERSHIP_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$MEMBERSHIP_DOC", 0 ] }, "$$ROOT" ] } }
        },{ 
            $match: {
                ORDERER_ID: new RegExp(dataItem.ORDERER_ID),
                ORDERER_NAME: new RegExp(dataItem.ORDERER_NAME),
                MEMBERSHIP_ID: new RegExp(dataItem.MEMBERSHIP_ID),
                MEMBERSHIP_NAME: new RegExp(dataItem.MEMBERSHIP_NAME),
                PEER_ID: new RegExp(dataItem.PEER_ID),
                PEER_NAME: new RegExp(dataItem.PEER_NAME),
                IS_ACTIVE: true
            },
        },{
            $project: {
                _id: 0,
                ORDERER_ID: 1,
                ORDERER_NAME: 1,

                MEMBERSHIP_ID: 1,
                MEMBERSHIP_NAME: 1,

                PEER_ID: 1,
                PEER_NAME: 1,

                HOST: 1,
                PORT: 1,

                CERT_TLS_ORDERER_PATH: 1,
                CERT_MSP_ORDERER_PATH: 1,
                CA_ORDER_FILE: 1,

                CERT_TLS_PEER_PATH: 1,
                CERT_MSP_PEER_PATH: 1,
    
                CERT_TLS_CLIENT_PATH: 1,
                CERT_MSP_CLIENT_PATH: 1,

                CREATE_BY: 1,
                UPDATE_BY: 1,
                CREATE_DATE: { $dateToString: { format: "%Y/%m/%d %H:%M:%S", date: "$CREATE_DATE" }},
                UPDATE_DATE: { $dateToString: { format: "%Y/%m/%d %H:%M:%S", date: "$UPDATE_DATE" }},
            }
        },{
            $sort: {
                PEER_NAME: 1//ASC
            },
        },{
            $skip: parseInt(dataItem.Start || 0),
        },{
            $limit: parseInt(dataItem.Limit || 1)
        }];

        Schema.PeerSchema.aggregate(query, function(err, result) {
            
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

        let schema = new Schema.PeerSchema();

        schema.ORDERER_ID = dataItem.ORDERER_ID;

        schema.MEMBERSHIP_ID = dataItem.MEMBERSHIP_ID;

        schema.PEER_ID = schema.id;
        schema.PEER_NAME = dataItem.PEER_NAME;

        schema.HOST = dataItem.HOST;
        schema.PORT = dataItem.PORT;

        schema.CERT_TLS_ORDERER_PATH = dataItem.CERT_TLS_ORDERER_PATH;
        schema.CERT_MSP_ORDERER_PATH = dataItem.CERT_MSP_ORDERER_PATH;
        schema.CA_ORDER_FILE = dataItem.CA_ORDER_FILE;

        schema.CERT_TLS_PEER_PATH = dataItem.CERT_TLS_PEER_PATH;
        schema.CERT_MSP_PEER_PATH = dataItem.CERT_MSP_PEER_PATH;

        schema.CERT_TLS_CLIENT_PATH = dataItem.CERT_TLS_CLIENT_PATH;
        schema.CERT_MSP_CLIENT_PATH = dataItem.CERT_MSP_CLIENT_PATH;

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

        schema.ORDERER_ID = dataItem.ORDERER_ID;

        schema.MEMBERSHIP_ID = dataItem.MEMBERSHIP_ID;

        schema.PEER_NAME = dataItem.PEER_NAME;

        schema.HOST = dataItem.HOST;
        schema.PORT = dataItem.PORT;

        schema.CERT_TLS_ORDERER_PATH = dataItem.CERT_TLS_ORDERER_PATH;
        schema.CERT_MSP_ORDERER_PATH = dataItem.CERT_MSP_ORDERER_PATH;
        schema.CA_ORDER_FILE = dataItem.CA_ORDER_FILE;
        
        schema.CERT_TLS_PEER_PATH = dataItem.CERT_TLS_PEER_PATH;
        schema.CERT_MSP_PEER_PATH = dataItem.CERT_MSP_PEER_PATH;

        schema.CERT_TLS_CLIENT_PATH = dataItem.CERT_TLS_CLIENT_PATH;
        schema.CERT_MSP_CLIENT_PATH = dataItem.CERT_MSP_CLIENT_PATH;

        schema.UPDATE_BY = dataItem.UPDATE_BY || 'System';
        schema.UPDATE_DATE = (new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60000);
        
        Schema.PeerSchema.findOneAndUpdate({ PEER_ID: dataItem.PEER_ID }, { $set: schema }, function(err) {

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
        
        Schema.PeerSchema.findOneAndUpdate({ PEER_ID: dataItem.PEER_ID }, { $set: schema }, function(err) {

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

export default PeerModel;