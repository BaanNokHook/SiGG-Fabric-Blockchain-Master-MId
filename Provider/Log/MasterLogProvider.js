//================== [START Import Modules] =================//
import commonlogkb from 'commonlog-kb';
//================== [END Import Modules] =================//

class MasterLogProvider {
    
    constructor() {

        this.LogsConfig = {

            projectName  : AppConfig.NodeName, // App Name

            // Enable appLog
            log  : {
                path : './logs/appLog/',
                //format : 'json',//"pipe",
                format : 'pipe',
                level : 'debug',
                console : true,
                file : true,
                time : 60,
                size : null
            },

            // Enable summaryLog
            summary  : {
                path : './logs/summary/',
                //format : 'json',//"pipe",
                format : 'pipe',
                console : false,
                file : true,
                time : 60,
                size : null
            },

            // Enable detail
            detail  : {
                path : './logs/detail/',
                //format : 'json',//"pipe",
                //format : 'pipe',
                console : false,
                file : true,
                time : 60,
                size : null,
                raw_data : true
            },

            // Enable stat
            stat  : {
                path : './logs/stat/',
                //format : 'json',//"pipe",
                format : 'pipe',
                console : false,
                file : true,
                path_db : undefined,
                time : 60,
                statInterval : 1,
                mode : 0,
                flush : true
            }
        };

        this.LogKb = commonlogkb.init(this.LogsConfig);
    }
}

export default MasterLogProvider;