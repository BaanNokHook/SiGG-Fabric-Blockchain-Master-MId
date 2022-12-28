
import ResultDataProperty from '../BusinessData/ResultData/ResultDataProperty.js';

import LogProvider from '../Provider/Log/LogProvider.js';

class MainController {

    constructor() {

    }

    static SetController() {

        App.use(function (req, res, next) {

            res.xSessionId = req.headers['x-session-id'] || MasterGen.GenXsession();
            res.xRtid = req.headers['x-rtid'] || MasterGen.GenTid();
            res.xTid = req.headers['x-tid'] || MasterGen.GenTid();
        
            let session = res.xSessionId + ':' + res.xRtid + ':' + res.xTid;
        
            let log = new LogProvider(session);
            
            log.Info('Start Proccess', req.method, req.originalUrl, '...');
            log.Info('Session', session);

            res.log = log;

            let urlNotFound = true;

            App._router.stack.forEach(function(r) {

                if (r.route && r.route.path) {

                    if(r.route.path === req.path) {

                        urlNotFound = false;

                        if(req.headers['content-type'] && req.headers['content-type'] === 'application/json') {

                            if(req.body.data && typeof req.body.data === 'object') {
                                req.body.data = JSON.stringify(req.body.data);
                            }                            
                        }
                        
                        log.Debug('Req params', req.query.data || req.body.data || 'have no data');
     
                        next();
                    }
                }
            });
            
            if(urlNotFound) {

                log.Error('Url not fuond');
            
                let resultData = new ResultDataProperty();

                resultData.Set(40401);
    
                let jsonString = JSON.stringify(resultData);
    
                res.status(resultData.GetResponseCode()).end(jsonString);
            }
        });

        App.get(RootUrl + '/Main/Config', function(req, res) {

            let resultData = new ResultDataProperty();

            resultData.Set(20000, AppConfig);

            let jsonString = JSON.stringify(resultData);

            res.status(resultData.GetResponseCode()).end(jsonString);
            
        });
    }
}

export default MainController;