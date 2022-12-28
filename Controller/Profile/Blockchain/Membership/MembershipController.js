import ResultDataProperty from '../../../../BusinessData/ResultData/ResultDataProperty.js';

import Model from  '../../../../Model/Profile/Blockchain/Membership/MembershipModel.js';

class MembershipController {

    constructor() {

    }

    static SetController() {

        App.get(RootUrl + '/Membership/GetMembershipName', function(req, res) {
            
            try {

                let log = res.log;

                let model = new Model;

                model.GetMembershipName(log, function(resultData) {

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

        App.get(RootUrl + '/Membership/Search', function(req, res) {
            
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

        App.post(RootUrl + '/Membership/Insert', function(req, res) {
            
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

        App.patch(RootUrl + '/Membership/Update', function(req, res) {
            
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

        App.delete(RootUrl + '/Membership/Delete', function(req, res) {
            
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

export default MembershipController;