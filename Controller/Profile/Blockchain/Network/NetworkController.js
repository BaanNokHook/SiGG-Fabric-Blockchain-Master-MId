import ResultDataProperty from '../../../../BusinessData/ResultData/ResultDataProperty.js';

import Model from  '../../../../Model/Profile/Blockchain/Network/NetworkModel.js';

class NetworkController {

    constructor() {

    }

    static SetController() {

        App.get(RootUrl + '/Network/GetNetworkName', function(req, res) {
            
            try {

                let log = res.log;

                let model = new Model;

                model.GetNetworkName(log, function(resultData) {

                    let jsonString = JSON.stringify(resultData);

                    res.status(resultData.GetResponseCode()).end(jsonString);

                }); 

            }
            catch(err) {   
                
                let log = res.log;

                log.Error(err.message);

                let resultData = new ResultDataProperty();

                resultData.Set(40000);

                let jsonString = JSON.stringify(resultData);

                res.status(resultData.GetResponseCode()).end(jsonString);
            }
        
        });

        App.get(RootUrl + '/Network/Search', function(req, res) {
            
            try {

                let log = res.log;

                let dataItem = JSON.parse(req.query.data);

                let model = new Model;

                model.Search(dataItem, log, function(resultData) {

                    let jsonString = JSON.stringify(resultData);

                    res.status(resultData.GetResponseCode()).end(jsonString);

                }); 

            }
            catch(err) {   
                
                let log = res.log;

                log.Error(err.message);

                let resultData = new ResultDataProperty();

                resultData.Set(40000);

                let jsonString = JSON.stringify(resultData);

                res.status(resultData.GetResponseCode()).end(jsonString);
            }
        
        });

        App.post(RootUrl + '/Network/Insert', function(req, res) {
            
            try {

                let log = res.log;

                let dataItem = JSON.parse(req.body.data);

                let model = new Model;

                model.Insert(dataItem, log, function(resultData) {

                    let jsonString = JSON.stringify(resultData);

                    res.status(resultData.GetResponseCode()).end(jsonString);

                }); 

            }
            catch(err) {   
                
                let log = res.log;

                log.Error(err.message);

                let resultData = new ResultDataProperty();

                resultData.Set(40000);

                let jsonString = JSON.stringify(resultData);

                res.status(resultData.GetResponseCode()).end(jsonString);
            }
        
        });

        App.patch(RootUrl + '/Network/Update', function(req, res) {
            
            try {

                let log = res.log;

                let dataItem = JSON.parse(req.body.data);

                let model = new Model;

                model.Update(dataItem, log, function(resultData) {

                    let jsonString = JSON.stringify(resultData);

                    res.status(resultData.GetResponseCode()).end(jsonString);

                }); 

            }
            catch(err) {   
                
                let log = res.log;

                log.Error(err.message);

                let resultData = new ResultDataProperty();

                resultData.Set(40000);

                let jsonString = JSON.stringify(resultData);

                res.status(resultData.GetResponseCode()).end(jsonString);
            }
        
        });

        App.delete(RootUrl + '/Network/Delete', function(req, res) {
            
            try {

                let log = res.log;

                let dataItem = JSON.parse(req.body.data);

                let model = new Model;

                model.Delete(dataItem, log, function(resultData) {

                    let jsonString = JSON.stringify(resultData);

                    res.status(resultData.GetResponseCode()).end(jsonString);

                }); 

            }
            catch(err) {   
                
                let log = res.log;

                log.Error(err.message);

                let resultData = new ResultDataProperty();

                resultData.Set(40000);

                let jsonString = JSON.stringify(resultData);

                res.status(resultData.GetResponseCode()).end(jsonString);
            }
        
        });
    }
}

export default NetworkController;