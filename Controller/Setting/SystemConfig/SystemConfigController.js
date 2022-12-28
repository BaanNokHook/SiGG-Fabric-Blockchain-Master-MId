import ResultDataProperty from '../../../BusinessData/ResultData/ResultDataProperty.js';

import Model from  '../../../Model/Setting/SystemConfig/SystemConfigModel.js';

class SystemConfigController {

    constructor() {

    }

    static SetController() {

        App.get(RootUrl + '/SystemConfig/GetSystemConfigToObjectByCondition', function(req, res) {
            
            try {

                let log = res.log;

                let dataItem = JSON.parse(req.query.data);

                let model = new Model;

                model.GetSystemConfigToObjectByCondition(dataItem, log, function(resultData) {

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

        App.get(RootUrl + '/SystemConfig/GetSystemConfigToTreeByCondition', function(req, res) {
            
            try {

                let log = res.log;

                let dataItem = JSON.parse(req.query.data);

                let model = new Model;

                model.GetSystemConfigToTreeByCondition(dataItem, log, function(resultData) {

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


        App.get(RootUrl + '/SystemConfig/Search', function(req, res) {
            
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

        App.post(RootUrl + '/SystemConfig/Insert', function(req, res) {
            
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

        App.patch(RootUrl + '/SystemConfig/Update', function(req, res) {
            
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

        App.delete(RootUrl + '/SystemConfig/Delete', function(req, res) {
            
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

export default SystemConfigController;