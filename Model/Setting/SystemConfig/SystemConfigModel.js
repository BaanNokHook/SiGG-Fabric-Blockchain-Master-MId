import ResultDataProperty from '../../../BusinessData/ResultData/ResultDataProperty.js';

class SystemConfigModel {

    GetSystemConfigToObjectByCondition (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let rules = {
            SYSTEM_ID: 'string',
            SYSTEM_NAME: 'string',
            PARTY_ID: 'string',
            PARTY_NAME: 'string',
            PARTY_PLMN_CODE: 'string',
            PARTNER_ID: 'string',
            PARTNER_NAME: 'string',
            PARTNER_PLMN_CODE: 'string'
        };

        Validate.Compare(dataItem, rules, function(err, result) {

            if(!err) {
                
                let query = [{
                    $lookup:{
                        from: "systems",
                        let: { system_id: "$SYSTEM_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$SYSTEM_ID', '$$system_id']
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                SYSTEM_ID: 1,
                                SYSTEM_NAME: 1
                            }
                        }],
                        as: "SYSTEM_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$SYSTEM_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "partys",
                        let: { party_id: "$PARTY_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{
                                        $eq: ['$PARTY_ID', '$$party_id'] 
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                PARTY_ID: 1,
                                PARTY_NAME: 1,
                                PARTY_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] }
                            }
                        }],
                        as: "PARTY_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PARTY_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "partys",
                        let: { partner_id: "$PARTNER_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$PARTY_ID', '$$partner_id'] 
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                PARTNER_ID: { $concat: [ "$PARTY_ID" ] },
                                PARTNER_NAME: { $concat: [ "$PARTY_NAME" ] },
                                PARTNER_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] }
                            }
                        }],
                        as: "PARTNER_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PARTNER_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "networks",
                        let: { network_id: "$NETWORK_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$NETWORK_ID', '$$network_id'] 
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                NETWORK_ID: 1,
                                NETWORK_NAME: 1
                            }
                        }],
                        as: "NETWORK_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$NETWORK_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "orderers",
                        let: { orderer_id: "$ORDERER_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$ORDERER_ID', '$$orderer_id']
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                ORDERER_ID: 1,
                                ORDERER_NAME: 1,
                                ORDERER_HOST: { $concat: [ "$HOST" ] },
                                ORDERER_PORT: { $concat: [ "$PORT" ] }
                            }
                        }],
                        as: "ORDERER_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "chaincodes",
                        let: { chaincode_id: "$CHAINCODE_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$CHAINCODE_ID', '$$chaincode_id']
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                CHAINCODE_ID: 1,
                                CHAINCODE_NAME: 1,
                                CHAINCODE_VERSION: 1
                            }
                        }],
                        as: "CHAINCODE_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$CHAINCODE_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "channels",
                        let: { channel_id: "$CHANNEL_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$CHANNEL_ID', '$$channel_id']
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                CHANNEL_ID: 1,
                                CHANNEL_NAME: 1
                            }
                        }],
                        as: "CHANNEL_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$CHANNEL_DOC", 0 ] }, "$$ROOT" ] } }
                },{
                    $lookup:{
                        from: "peers",
                        let: { peer_id: "$PEER_ID"},
                        pipeline: [{ 
                            $match:{ 
                                $expr:{ 
                                    $and:[{ 
                                        $eq: ['$PEER_ID', '$$peer_id']
                                    }]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                PEER_ID: 1,
                                PEER_NAME: 1,
        
                                PEER_HOST: { $concat: [ "$HOST" ] },
                                PEER_PORT: { $concat: [ "$PORT" ] },
        
                                CERT_TLS_ORDERER_PATH: 1,
                                CERT_MSP_ORDERER_PATH: 1,
                                CA_ORDER_FILE: 1,
        
                                CERT_TLS_PEER_PATH: 1,
                                CERT_MSP_PEER_PATH: 1,
                    
                                CERT_TLS_CLIENT_PATH: 1,
                                CERT_MSP_CLIENT_PATH: 1
                            }
                        }],
                        as: "PEER_DOC"
                    }
                },{
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PEER_DOC", 0 ] }, "$$ROOT" ] } }
                },{ 
                    $match: {
                        SYSTEM_ID : new RegExp(dataItem.SYSTEM_ID),
                        SYSTEM_NAME : new RegExp(dataItem.SYSTEM_NAME),
                        PARTY_ID : new RegExp(dataItem.PARTY_ID),
                        PARTY_NAME : new RegExp(dataItem.PARTY_NAME),
                        PARTY_PLMN_CODE : new RegExp(dataItem.PARTY_PLMN_CODE),
                        PARTNER_ID : new RegExp(dataItem.PARTNER_ID),
                        PARTNER_NAME : new RegExp(dataItem.PARTNER_NAME),
                        PARTNER_PLMN_CODE : new RegExp(dataItem.PARTNER_PLMN_CODE)
                    }
                },{
                    $project: {
                        _id: 0,
                        SYSTEM_ID: 1,
                        SYSTEM_NAME: 1,
        
                        PARTY_ID: 1,
                        PARTY_NAME: 1,
                        PARTY_PLMN_CODE: 1,
        
                        PARTNER_ID: 1,
                        PARTNER_NAME: 1,
                        PARTNER_PLMN_CODE: 1,
        
                        NETWORK_ID: 1,
                        NETWORK_NAME: 1,
        
                        ORDERER_ID: 1,
                        ORDERER_NAME: 1,
                        ORDERER_HOST: 1,
                        ORDERER_PORT: 1,
        
                        CHAINCODE_ID: 1,
                        CHAINCODE_NAME: 1,
                        CHAINCODE_VERSION: 1,
        
                        CHANNEL_ID: 1,
                        CHANNEL_NAME: 1,
        
                        PEER_ID: 1,
                        PEER_NAME: 1,
                        PEER_HOST: 1,
                        PEER_PORT: 1,
                        CERT_TLS_ORDERER_PATH: 1,
                        CERT_MSP_ORDERER_PATH: 1,
                        CA_ORDER_FILE: 1,
                        CERT_TLS_PEER_PATH: 1,
                        CERT_MSP_PEER_PATH: 1,
                        CERT_TLS_CLIENT_PATH: 1,
                        CERT_MSP_CLIENT_PATH: 1
                    }
                }];
                
                log.Debug('Query', JSON.stringify(query));

                Schema.SystemConfigSchema.aggregate(query, function(err, result) {
                    
                    if (!err) {
        
                        if(result.length > 0) {
        
                            let getPeer = function(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id, channel_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['PEER_ID'];
        
                                    if (!temp[key] 
                                        && item['SYSTEM_ID'] === system_id 
                                        && item['PARTY_ID'] === party_id 
                                        && item['PARTNER_ID'] === partner_id 
                                        && item['NETWORK_ID'] === network_id 
                                        && item['ORDERER_ID'] === orderer_id 
                                        && item['CHAINCODE_ID'] === chaincode_id 
                                        && item['CHANNEL_ID'] === channel_id 
                                    ) {
        
                                        temp[key] = true;
        
                                        let peer_id = item['PEER_ID'];
                                        let peer_name = item['PEER_NAME'];
        
                                        let peer_host = item['PEER_HOST'];
                                        let peer_port = item['PEER_PORT'];
        
                                        let cert_tls_orderer_path = item['CERT_TLS_ORDERER_PATH'];
                                        let cert_msp_orderer_path = item['CERT_MSP_ORDERER_PATH'];
                                        let ca_order_file = item['CA_ORDER_FILE'];
                
                                        let cert_tls_peer_path = item['CERT_TLS_PEER_PATH'];
                                        let cert_msp_peer_path = item['CERT_MSP_PEER_PATH'];
                            
                                        let cert_tls_client_path = item['CERT_TLS_CLIENT_PATH'];
                                        let cert_msp_client_path = item['CERT_MSP_CLIENT_PATH'];
                                        
                                        result.push({
        
                                            PEER_ID: peer_id,
                                            PEER_NAME: peer_name,
        
                                            PEER_HOST: peer_host,
                                            PEER_PORT: peer_port,
        
                                            CERT_TLS_ORDERER_PATH: cert_tls_orderer_path,
                                            CERT_MSP_ORDERER_PATH: cert_msp_orderer_path,
                                            CA_ORDER_FILE: ca_order_file,
        
                                            CERT_TLS_PEER_PATH: cert_tls_peer_path,
                                            CERT_MSP_PEER_PATH: cert_msp_peer_path,
        
                                            CERT_TLS_CLIENT_PATH: cert_tls_client_path,
                                            CERT_MSP_CLIENT_PATH: cert_msp_client_path
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let getChannel = function(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['CHANNEL_ID'];
        
                                    if (!temp[key] 
                                        && item['SYSTEM_ID'] === system_id 
                                        && item['PARTY_ID'] === party_id 
                                        && item['PARTNER_ID'] === partner_id 
                                        && item['NETWORK_ID'] === network_id 
                                        && item['ORDERER_ID'] === orderer_id 
                                        && item['CHAINCODE_ID'] === chaincode_id 
                                    ) {
        
                                        temp[key] = true;
        
                                        let channel_id = item['CHANNEL_ID'];
                                        let channel_name = item['CHANNEL_NAME'];
        
                                        result.push({
        
                                            CHANNEL_ID: channel_id,
                                            CHANNEL_NAME: channel_name,
        
                                            PEER_LIST: getPeer(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id, channel_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let getChaincode = function(itemList, system_id, party_id, partner_id, network_id, orderer_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['CHAINCODE_ID'];
        
                                    if (!temp[key] 
                                        && item['SYSTEM_ID'] === system_id 
                                        && item['PARTY_ID'] === party_id 
                                        && item['PARTNER_ID'] === partner_id 
                                        && item['NETWORK_ID'] === network_id 
                                        && item['ORDERER_ID'] === orderer_id 
                                    ) {
        
                                        temp[key] = true;
        
                                        let chaincode_id = item['CHAINCODE_ID'];
                                        let chaincode_name = item['CHAINCODE_NAME'];
                                        let chaincode_version = item['CHAINCODE_VERSION'];
        
                                        result.push({
        
                                            CHAINCODE_ID: chaincode_id,
                                            CHAINCODE_NAME: chaincode_name,
                                            CHAINCODE_VERSION: chaincode_version,
        
                                            CHANNEL_LIST: getChannel(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let getOrderer = function(itemList, system_id, party_id, partner_id, network_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['ORDERER_ID'];
        
                                    if (!temp[key] 
                                        && item['SYSTEM_ID'] === system_id 
                                        && item['PARTY_ID'] === party_id 
                                        && item['PARTNER_ID'] === partner_id 
                                        && item['NETWORK_ID'] === network_id 
                                    ) {
        
                                        temp[key] = true;
        
                                        let orderer_id = item['ORDERER_ID'];
                                        let orderer_name = item['ORDERER_NAME'];
                                        let orderer_host = item['ORDERER_HOST'];
                                        let orderer_port = item['ORDERER_PORT'];
        
                                        result.push({
        
                                            ORDERER_ID: orderer_id,
                                            ORDERER_NAME: orderer_name,
                                            ORDERER_HOST: orderer_host,
                                            ORDERER_PORT: orderer_port,
        
                                            CHAINCODE_LIST: getChaincode(itemList, system_id, party_id, partner_id, network_id, orderer_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let getNetwork = function(itemList, system_id, party_id, partner_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['NETWORK_ID'];
        
                                    if (!temp[key] 
                                        && item['SYSTEM_ID'] === system_id 
                                        && item['PARTY_ID'] === party_id 
                                        && item['PARTNER_ID'] === partner_id 
                                    ) {
        
                                        temp[key] = true;
        
                                        let network_id = item['NETWORK_ID'];
                                        let network_name = item['NETWORK_NAME'];
        
                                        result.push({
        
                                            NETWORK_ID: network_id,
                                            NETWORK_NAME: network_name,
        
                                            ORDERER_LIST: getOrderer(itemList, system_id, party_id, partner_id, network_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let getPartner = function(itemList, system_id, party_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['PARTNER_ID'];
        
                                    if (!temp[key] 
                                        && item['SYSTEM_ID'] === system_id 
                                        && item['PARTY_ID'] === party_id 
                                    ) {
        
                                        temp[key] = true;
        
                                        let partner_id = item['PARTNER_ID'];
                                        let partner_name = item['PARTNER_NAME'];
                                        let partner_plmn_code = item['PARTNER_PLMN_CODE'];
        
                                        result.push({
        
                                            PARTNER_ID: partner_id,
                                            PARTNER_NAME: partner_name,
                                            PARTNER_PLMN_CODE: partner_plmn_code,
        
                                            NETWORK_LIST: getNetwork(itemList, system_id, party_id, partner_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
                            
                            let getParty = function(itemList, system_id) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['PARTY_ID'];
        
                                    if (!temp[key]
                                        && item['SYSTEM_ID'] === system_id
                                    ) {
        
                                        temp[key] = true;
        
                                        let party_id = item['PARTY_ID'];
                                        let party_name = item['PARTY_NAME'];
                                        let party_plmn_code = item['PARTY_PLMN_CODE'];
        
                                        result.push({
        
                                            PARTY_ID: party_id,
                                            PARTY_NAME: party_name,
                                            PARTY_PLMN_CODE: party_plmn_code,
        
                                            PARTNER_LIST: getPartner(itemList, system_id, party_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let createTree = function(itemList) {
        
                                let result = [];
        
                                itemList.reduce(function (temp, item) {
        
                                    let key = item['SYSTEM_ID'];
        
                                    if (!temp[key]) {
        
                                        temp[key] = true;
        
                                        let system_id = item['SYSTEM_ID'];
                                        let system_name = item['SYSTEM_NAME'];
        
                                        result.push({
        
                                            SYSTEM_ID: system_id,
                                            SYSTEM_NAME: system_name,
        
                                            PARTY_LIST: getParty(itemList, system_id)
        
                                        });
                                    }
        
                                    return temp;
        
                                }, {});
        
                                return result;
                            }
        
                            let tree = createTree(result);
                            
                            log.Debug('Result', JSON.stringify(tree));

                            resultData.Set(20000, tree);
        
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
        
                // let resultData = new ResultDataProperty();
        
                // let query = [{
                //     $lookup:{
                //         from: "systems",
                //         let: { system_id: "$SYSTEM_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$SYSTEM_ID', '$$system_id']
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 SYSTEM_ID: 1,
                //                 SYSTEM_NAME: 1
                //             }
                //         }],
                //         as: "SYSTEM"
                //     }
                // },{
                //     $lookup:{
                //         from: "partys",
                //         let: { party_id: "$PARTY_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{
                //                         $eq: ['$PARTY_ID', '$$party_id'] 
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 PARTY_ID: 1,
                //                 PARTY_NAME: 1,
                //                 PARTY_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] }
                //             }
                //         }],
                //         as: "PARTY"
                //     }
                // },{
                //     $lookup:{
                //         from: "partys",
                //         let: { partner_id: "$PARTNER_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$PARTY_ID', '$$partner_id'] 
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 PARTNER_ID: { $concat: [ "$PARTY_ID" ] },
                //                 PARTNER_NAME: { $concat: [ "$PARTY_NAME" ] },
                //                 PARTNER_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] }
                //             }
                //         }],
                //         as: "PARTNER"
                //     }
                // },{
                //     $lookup:{
                //         from: "networks",
                //         let: { network_id: "$NETWORK_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$NETWORK_ID', '$$network_id'] 
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 NETWORK_ID: 1,
                //                 NETWORK_NAME: 1
                //             }
                //         }],
                //         as: "NETWORK"
                //     }
                // },{
                //     $lookup:{
                //         from: "orderers",
                //         let: { orderer_id: "$ORDERER_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$ORDERER_ID', '$$orderer_id']
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 ORDERER_ID: 1,
                //                 ORDERER_NAME: 1,
                //                 HOST: 1,
                //                 PORT: 1
                //             }
                //         }],
                //         as: "ORDERER"
                //     }
                // },{
                //     $lookup:{
                //         from: "chaincodes",
                //         let: { chaincode_id: "$CHAINCODE_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$CHAINCODE_ID', '$$chaincode_id']
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 CHAINCODE_ID: 1,
                //                 CHAINCODE_NAME: 1,
                //                 CHAINCODE_VERSION: 1
                //             }
                //         }],
                //         as: "CHAINCODE"
                //     }
                // },{
                //     $lookup:{
                //         from: "channels",
                //         let: { channel_id: "$CHANNEL_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$CHANNEL_ID', '$$channel_id']
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 CHANNEL_ID: 1,
                //                 CHANNEL_NAME: 1
                //             }
                //         }],
                //         as: "CHANNEL"
                //     }
                // },{
                //     $lookup:{
                //         from: "peers",
                //         let: { peer_id: "$PEER_ID"},
                //         pipeline: [{ 
                //             $match:{ 
                //                 $expr:{ 
                //                     $and:[{ 
                //                         $eq: ['$PEER_ID', '$$peer_id']
                //                     }]
                //                 }
                //             }
                //         },{
                //             $project: {
                //                 _id: 0,
                //                 PEER_ID: 1,
                //                 PEER_NAME: 1,
        
                //                 HOST: 1,
                //                 PORT: 1,
        
                //                 CERT_TLS_ORDERER_PATH: 1,
                //                 CERT_MSP_ORDERER_PATH: 1,
                //                 CA_ORDER_FILE: 1,
        
                //                 CERT_TLS_PEER_PATH: 1,
                //                 CERT_MSP_PEER_PATH: 1,
                    
                //                 CERT_TLS_CLIENT_PATH: 1,
                //                 CERT_MSP_CLIENT_PATH: 1
                //             }
                //         }],
                //         as: "PEER"
                //     }
                // },{ 
                //     $match: {
                //         SYSTEM : {
                //             $elemMatch : {
                //                 SYSTEM_ID : {
                //                     $all : [
                //                         new RegExp(dataItem.SYSTEM_ID)
                //                     ]
                //                 },
                //                 SYSTEM_NAME : {
                //                     $all : [
                //                         new RegExp(dataItem.SYSTEM_NAME)
                //                     ]
                //                 }
                //             }
                //         },
                //         PARTY : {
                //             $elemMatch : {
                //                 PARTY_ID : {
                //                     $all : [
                //                         new RegExp(dataItem.PARTY_ID)
                //                     ]
                //                 },
                //                 PARTY_NAME : {
                //                     $all : [
                //                         new RegExp(dataItem.PARTY_NAME)
                //                     ]
                //                 },
                //                 PARTY_PLMN_CODE : {
                //                     $all : [
                //                         new RegExp(dataItem.PARTY_PLMN_CODE)
                //                     ]
                //                 }
                //             }
                //         },
                //         PARTNER : {
                //             $elemMatch : {
                //                 PARTNER_ID : {
                //                     $all : [
                //                         new RegExp(dataItem.PARTNER_ID)
                //                     ]
                //                 },
                //                 PARTNER_NAME : {
                //                     $all : [
                //                         new RegExp(dataItem.PARTNER_NAME)
                //                     ]
                //                 },
                //                 PARTNER_PLMN_CODE : {
                //                     $all : [
                //                         new RegExp(dataItem.PARTNER_PLMN_CODE)
                //                     ]
                //                 }
                //             }
                //         }
                //     }
                // },{
                //     $project: {
                //         _id: 0,
                //         SYSTEM: { $mergeObjects: [ { $arrayElemAt: [ "$SYSTEM", 0 ] } ] },
                //         PARTY: { $mergeObjects: [ { $arrayElemAt: [ "$PARTY", 0 ] } ] },
                //         PARTNER: { $mergeObjects: [ { $arrayElemAt: [ "$PARTNER", 0 ] } ] },
                //         NETWORK: { $mergeObjects: [ { $arrayElemAt: [ "$NETWORK", 0 ] } ] },
                //         ORDERER: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER", 0 ] } ] },
                //         CHAINCODE: { $mergeObjects: [ { $arrayElemAt: [ "$CHAINCODE", 0 ] } ] },
                //         CHANNEL: { $mergeObjects: [ { $arrayElemAt: [ "$CHANNEL", 0 ] } ] },
                //         PEER: { $mergeObjects: [ { $arrayElemAt: [ "$PEER", 0 ] } ] },
                //     }
                // }];
        
                // Schema.SystemConfigSchema.aggregate(query, function(err, result) {
                    
                //     if (!err) {
        
                //         if(result.length > 0) {
        
                //             resultData.Set(20000, result);
        
                //         }
                //         else {
                            
                //             log.Error('Data not found');
        
                //             resultData.Set(40400);
        
                //         }
        
                //         callback(resultData);
                //     }
                //     else {
        
                //         log.Error(err.message);
        
                //         resultData.Set(50000);
        
                //         callback(resultData);
                //     }
        
                // });
            }
            else {
                log.Error(result.message);

                resultData.Set(40000, result.message);

                callback(resultData);
            }
        });
    }

    GetSystemConfigToTreeByCondition (dataItem, log, callback) {

        let resultData = new ResultDataProperty();

        let query = [{
            $lookup:{
                from: "systems",
                let: { system_id: "$SYSTEM_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$SYSTEM_ID', '$$system_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        SYSTEM_ID: 1,
                        SYSTEM_NAME: 1
                    }
                }],
                as: "SYSTEM_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$SYSTEM_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "partys",
                let: { party_id: "$PARTY_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{
                                $eq: ['$PARTY_ID', '$$party_id'] 
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        PARTY_ID: 1,
                        PARTY_NAME: 1,
                        PARTY_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] },
                        PARTY_FULL_NAME: { $concat: [ "$PARTY_NAME", "[", "$PLMN_CODE", "]" ] }
                    }
                }],
                as: "PARTY_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PARTY_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "partys",
                let: { partner_id: "$PARTNER_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$PARTY_ID', '$$partner_id'] 
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        PARTNER_ID: { $concat: [ "$PARTY_ID" ] },
                        PARTNER_NAME: { $concat: [ "$PARTY_NAME" ] },
                        PARTNER_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] },
                        PARTNER_FULL_NAME: { $concat: [ "$PARTY_NAME", "[", "$PLMN_CODE", "]" ] }
                    }
                }],
                as: "PARTNER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PARTNER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "networks",
                let: { network_id: "$NETWORK_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$NETWORK_ID', '$$network_id'] 
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        NETWORK_ID: 1,
                        NETWORK_NAME: 1
                    }
                }],
                as: "NETWORK_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$NETWORK_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "orderers",
                let: { orderer_id: "$ORDERER_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$ORDERER_ID', '$$orderer_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        ORDERER_ID: 1,
                        ORDERER_NAME: 1
                    }
                }],
                as: "ORDERER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "chaincodes",
                let: { chaincode_id: "$CHAINCODE_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$CHAINCODE_ID', '$$chaincode_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        CHAINCODE_ID: 1,
                        CHAINCODE_NAME: 1
                    }
                }],
                as: "CHAINCODE_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$CHAINCODE_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "channels",
                let: { channel_id: "$CHANNEL_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$CHANNEL_ID', '$$channel_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        CHANNEL_ID: 1,
                        CHANNEL_NAME: 1
                    }
                }],
                as: "CHANNEL_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$CHANNEL_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "peers",
                let: { peer_id: "$PEER_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$PEER_ID', '$$peer_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        PEER_ID: 1,
                        PEER_NAME: 1
                    }
                }],
                as: "PEER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PEER_DOC", 0 ] }, "$$ROOT" ] } }
        },{ 
            $match: {
                SYSTEM_ID : new RegExp(dataItem.SYSTEM_ID),
                SYSTEM_NAME : new RegExp(dataItem.SYSTEM_NAME),
                PARTY_ID : new RegExp(dataItem.PARTY_ID),
                PARTY_NAME : new RegExp(dataItem.PARTY_NAME),
                PARTY_PLMN_CODE : new RegExp(dataItem.PARTY_PLMN_CODE),
                PARTNER_ID : new RegExp(dataItem.PARTNER_ID),
                PARTNER_NAME : new RegExp(dataItem.PARTNER_NAME),
                PARTNER_PLMN_CODE : new RegExp(dataItem.PARTNER_PLMN_CODE)
            }
        },{
            $project: {
                _id: 0,
                SYSTEM_ID: 1,
                SYSTEM_NAME: 1,

                PARTY_ID: 1,
                PARTY_NAME: 1,
                PARTY_PLMN_CODE: 1,
                PARTY_FULL_NAME: 1,

                PARTNER_ID: 1,
                PARTNER_NAME: 1,
                PARTNER_PLMN_CODE: 1,
                PARTNER_FULL_NAME: 1,

                NETWORK_ID: 1,
                NETWORK_NAME: 1,

                ORDERER_ID: 1,
                ORDERER_NAME: 1,

                CHAINCODE_ID: 1,
                CHAINCODE_NAME: 1,

                CHANNEL_ID: 1,
                CHANNEL_NAME: 1,

                PEER_ID: 1,
                PEER_NAME: 1
            }
        }];

        Schema.SystemConfigSchema.aggregate(query, function(err, result) {
            
            if (!err) {

                if(result.length > 0) {

                    let getPeer = function(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id, channel_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['PEER_ID'];

                            if (!temp[key] 
                                && item['SYSTEM_ID'] === system_id 
                                && item['PARTY_ID'] === party_id 
                                && item['PARTNER_ID'] === partner_id 
                                && item['NETWORK_ID'] === network_id 
                                && item['ORDERER_ID'] === orderer_id 
                                && item['CHAINCODE_ID'] === chaincode_id 
                                && item['CHANNEL_ID'] === channel_id 
                            ) {

                                temp[key] = true;

                                let peer_id = item['PEER_ID'];
                                let peer_name = item['PEER_NAME'];

                                result.push({

                                    PEER_ID: peer_id,
                                    PEER_NAME: peer_name,

                                    id: peer_id + result.length,
                                    text: peer_name,
                                    leaf: false,
                                    expanded: true,
                                    children: ''

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let getChannel = function(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['CHANNEL_ID'];

                            if (!temp[key] 
                                && item['SYSTEM_ID'] === system_id 
                                && item['PARTY_ID'] === party_id 
                                && item['PARTNER_ID'] === partner_id 
                                && item['NETWORK_ID'] === network_id 
                                && item['ORDERER_ID'] === orderer_id 
                                && item['CHAINCODE_ID'] === chaincode_id 
                            ) {

                                temp[key] = true;

                                let channel_id = item['CHANNEL_ID'];
                                let channel_name = item['CHANNEL_NAME'];

                                result.push({

                                    CHANNEL_ID: channel_id,
                                    CHANNEL_NAME: channel_name,

                                    id: channel_id + result.length,
                                    text: channel_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getPeer(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id, channel_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let getChaincode = function(itemList, system_id, party_id, partner_id, network_id, orderer_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['CHAINCODE_ID'];

                            if (!temp[key] 
                                && item['SYSTEM_ID'] === system_id 
                                && item['PARTY_ID'] === party_id 
                                && item['PARTNER_ID'] === partner_id 
                                && item['NETWORK_ID'] === network_id 
                                && item['ORDERER_ID'] === orderer_id 
                            ) {

                                temp[key] = true;

                                let chaincode_id = item['CHAINCODE_ID'];
                                let chaincode_name = item['CHAINCODE_NAME'];

                                result.push({

                                    CHAINCODE_ID: chaincode_id,
                                    CHAINCODE_NAME: chaincode_name,

                                    id: chaincode_id + result.length,
                                    text: chaincode_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getChannel(itemList, system_id, party_id, partner_id, network_id, orderer_id, chaincode_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let getOrderer = function(itemList, system_id, party_id, partner_id, network_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['ORDERER_ID'];

                            if (!temp[key] 
                                && item['SYSTEM_ID'] === system_id 
                                && item['PARTY_ID'] === party_id 
                                && item['PARTNER_ID'] === partner_id 
                                && item['NETWORK_ID'] === network_id 
                            ) {

                                temp[key] = true;

                                let orderer_id = item['ORDERER_ID'];
                                let orderer_name = item['ORDERER_NAME'];

                                result.push({

                                    ORDERER_ID: orderer_id,
                                    ORDERER_NAME: orderer_name,

                                    id: orderer_id + result.length,
                                    text: orderer_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getChaincode(itemList, system_id, party_id, partner_id, network_id, orderer_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let getNetwork = function(itemList, system_id, party_id, partner_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['NETWORK_ID'];

                            if (!temp[key] 
                                && item['SYSTEM_ID'] === system_id 
                                && item['PARTY_ID'] === party_id 
                                && item['PARTNER_ID'] === partner_id 
                            ) {

                                temp[key] = true;

                                let network_id = item['NETWORK_ID'];
                                let network_name = item['NETWORK_NAME'];

                                result.push({

                                    NETWORK_ID: network_id,
                                    NETWORK_NAME: network_name,

                                    id: network_id + result.length,
                                    text: network_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getOrderer(itemList, system_id, party_id, partner_id, network_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let getPartner = function(itemList, system_id, party_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['PARTNER_ID'];

                            if (!temp[key] 
                                && item['SYSTEM_ID'] === system_id 
                                && item['PARTY_ID'] === party_id 
                            ) {

                                temp[key] = true;

                                let partner_id = item['PARTNER_ID'];
                                let partner_name = item['PARTNER_NAME'];
                                let partner_plmn_code = item['PARTNER_PLMN_CODE'];
                                let partner_full_name = partner_name + "[" + partner_plmn_code + "]";

                                result.push({

                                    partner_ID: partner_id,
                                    partner_NAME: partner_name,
                                    partner_PLMN_CODE: partner_plmn_code,
                                    partner_FULL_NAME: partner_full_name,

                                    id: partner_id + result.length,
                                    text: partner_full_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getNetwork(itemList, system_id, party_id, partner_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }
                    
                    let getParty = function(itemList, system_id) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['PARTY_ID'];

                            if (!temp[key]
                                && item['SYSTEM_ID'] === system_id
                            ) {

                                temp[key] = true;

                                let party_id = item['PARTY_ID'];
                                let party_name = item['PARTY_NAME'];
                                let party_plmn_code = item['PARTY_PLMN_CODE'];
                                let party_full_name = party_name + "[" + party_plmn_code + "]";

                                result.push({

                                    PARTY_ID: party_id,
                                    PARTY_NAME: party_name,
                                    PARTY_PLMN_CODE: party_plmn_code,
                                    PARTY_FULL_NAME: party_full_name,

                                    id: party_id + result.length,
                                    text: party_full_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getPartner(itemList, system_id, party_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let createTree = function(itemList) {

                        let result = [];

                        itemList.reduce(function (temp, item) {

                            let key = item['SYSTEM_ID'];

                            if (!temp[key]) {

                                temp[key] = true;

                                let system_id = item['SYSTEM_ID'];
                                let system_name = item['SYSTEM_NAME'];

                                result.push({

                                    SYSTEM_ID: system_id,
                                    SYSTEM_NAME: system_name,

                                    id: system_id + result.length,
                                    text: system_name,
                                    leaf: false,
                                    expanded: true,
                                    children: getParty(itemList, system_id)

                                });
                            }

                            return temp;

                        }, {});

                        return result;
                    }

                    let tree = createTree(result);

                    resultData.Set(20000, tree);

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
                from: "systems",
                let: { system_id: "$SYSTEM_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$SYSTEM_ID', '$$system_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        SYSTEM_ID: 1,
                        SYSTEM_NAME: 1
                    }
                }],
                as: "SYSTEM_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$SYSTEM_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "partys",
                let: { party_id: "$PARTY_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{
                                $eq: ['$PARTY_ID', '$$party_id'] 
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        PARTY_ID: 1,
                        PARTY_NAME: 1,
                        PARTY_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] },
                        PARTY_FULL_NAME: { $concat: [ "$PARTY_NAME", "[", "$PLMN_CODE", "]" ] }
                    }
                }],
                as: "PARTY_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PARTY_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "partys",
                let: { partner_id: "$PARTNER_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$PARTY_ID', '$$partner_id'] 
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        PARTNER_ID: { $concat: [ "$PARTY_ID" ] },
                        PARTNER_NAME: { $concat: [ "$PARTY_NAME" ] },
                        PARTNER_PLMN_CODE: { $concat: [ "$PLMN_CODE" ] },
                        PARTNER_FULL_NAME: { $concat: [ "$PARTY_NAME", "[", "$PLMN_CODE", "]" ] }
                    }
                }],
                as: "PARTNER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PARTNER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "networks",
                let: { network_id: "$NETWORK_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$NETWORK_ID', '$$network_id'] 
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        NETWORK_ID: 1,
                        NETWORK_NAME: 1
                    }
                }],
                as: "NETWORK_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$NETWORK_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "orderers",
                let: { orderer_id: "$ORDERER_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$ORDERER_ID', '$$orderer_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        ORDERER_ID: 1,
                        ORDERER_NAME: 1
                    }
                }],
                as: "ORDERER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ORDERER_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "chaincodes",
                let: { chaincode_id: "$CHAINCODE_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$CHAINCODE_ID', '$$chaincode_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        CHAINCODE_ID: 1,
                        CHAINCODE_NAME: 1
                    }
                }],
                as: "CHAINCODE_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$CHAINCODE_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "channels",
                let: { channel_id: "$CHANNEL_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$CHANNEL_ID', '$$channel_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        CHANNEL_ID: 1,
                        CHANNEL_NAME: 1
                    }
                }],
                as: "CHANNEL_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$CHANNEL_DOC", 0 ] }, "$$ROOT" ] } }
        },{
            $lookup:{
                from: "peers",
                let: { peer_id: "$PEER_ID"},
                pipeline: [{ 
                    $match:{ 
                        $expr:{ 
                            $and:[{ 
                                $eq: ['$PEER_ID', '$$peer_id']
                            }]
                        }
                    }
                },{
                    $project: {
                        _id: 0,
                        PEER_ID: 1,
                        PEER_NAME: 1
                    }
                }],
                as: "PEER_DOC"
            }
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$PEER_DOC", 0 ] }, "$$ROOT" ] } }
        },{ 
            $match: {
                SYSTEM_ID : new RegExp(dataItem.SYSTEM_ID),
                SYSTEM_NAME : new RegExp(dataItem.SYSTEM_NAME),
                PARTY_ID : new RegExp(dataItem.PARTY_ID),
                PARTY_NAME : new RegExp(dataItem.PARTY_NAME),
                PARTY_PLMN_CODE : new RegExp(dataItem.PARTY_PLMN_CODE),
                PARTNER_ID : new RegExp(dataItem.PARTNER_ID),
                PARTNER_NAME : new RegExp(dataItem.PARTNER_NAME),
                PARTNER_PLMN_CODE : new RegExp(dataItem.PARTNER_PLMN_CODE)
            }
        },{
            $project: {
                _id: 0,
                SYSTEM_ID: 1,
                SYSTEM_NAME: 1,

                PARTY_ID: 1,
                PARTY_NAME: 1,
                PARTY_PLMN_CODE: 1,
                PARTY_FULL_NAME: 1,

                PARTNER_ID: 1,
                PARTNER_NAME: 1,
                PARTNER_PLMN_CODE: 1,
                PARTNER_FULL_NAME: 1,

                NETWORK_ID: 1,
                NETWORK_NAME: 1,

                ORDERER_ID: 1,
                ORDERER_NAME: 1,

                CHAINCODE_ID: 1,
                CHAINCODE_NAME: 1,

                CHANNEL_ID: 1,
                CHANNEL_NAME: 1,

                PEER_ID: 1,
                PEER_NAME: 1
            }
        },{
            $skip: parseInt(dataItem.Start || 0),
        },{
            $limit: parseInt(dataItem.Limit || 1)
        }];

        Schema.SystemConfigSchema.aggregate(query, function(err, result) {
            
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

        let schema = new Schema.SystemConfigSchema();

        schema.SYSTEM_ID = dataItem.SYSTEM_ID; 
        schema.PARTY_ID = dataItem.PARTY_ID; 
        schema.PARTNER_ID = dataItem.PARTNER_ID;
        schema.NETWORK_ID = dataItem.NETWORK_ID; 
        schema.ORDERER_ID = dataItem.ORDERER_ID; 
        schema.CHAINCODE_ID = dataItem.CHAINCODE_ID; 
        schema.CHANNEL_ID = dataItem.CHANNEL_ID;
        schema.PEER_ID = dataItem.PEER_ID;

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

        schema.SYSTEM_ID = dataItem.NEW_SYSTEM_ID; 
        schema.PARTY_ID = dataItem.NEW_PARTY_ID; 
        schema.PARTNER_ID = dataItem.NEW_PARTNER_ID;
        schema.NETWORK_ID = dataItem.NEW_NETWORK_ID; 
        schema.ORDERER_ID = dataItem.NEW_ORDERER_ID; 
        schema.CHAINCODE_ID = dataItem.NEW_CHAINCODE_ID; 
        schema.CHANNEL_ID = dataItem.NEW_CHANNEL_ID;
        schema.PEER_ID = dataItem.NEW_PEER_ID;
        
        Schema.SystemConfigSchema.findOneAndUpdate({ 

            SYSTEM_ID: dataItem.OLD_SYSTEM_ID,
            PARTY_ID: dataItem.OLD_PARTY_ID,
            PARTNER_ID: dataItem.OLD_PARTNER_ID,
            NETWORK_ID: dataItem.OLD_NETWORK_ID, 
            ORDERER_ID: dataItem.OLD_ORDERER_ID,
            CHAINCODE_ID: dataItem.OLD_CHAINCODE_ID, 
            CHANNEL_ID: dataItem.OLD_CHANNEL_ID,
            PEER_ID: dataItem.OLD_PEER_ID

        }, { $set: schema }, function(err) {

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

        Schema.SystemConfigSchema.findOneAndRemove({ 
            
            SYSTEM_ID: dataItem.SYSTEM_ID,
            PARTY_ID: dataItem.PARTY_ID,
            PARTNER_ID: dataItem.PARTNER_ID,
            NETWORK_ID: dataItem.NETWORK_ID, 
            ORDERER_ID: dataItem.ORDERER_ID,
            CHAINCODE_ID: dataItem.CHAINCODE_ID, 
            CHANNEL_ID: dataItem.CHANNEL_ID,
            PEER_ID: dataItem.PEER_ID
            
        }, function(err) {

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

export default SystemConfigModel;