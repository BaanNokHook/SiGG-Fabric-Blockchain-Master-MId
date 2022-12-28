//================== [START Import Modules] =================//
import mongoose from 'mongoose';

import SchemaModelProperty from '../../SchemaModel/SchemaModelProperty.js';
//================== [END Import Modules] =================//

class MongoDBProperty {
    
    constructor() {

    }

    static Connection(global) {
        
        global.MongoDb = mongoose;
        
        let SetSchemaModel = function() {
               
            SchemaModelProperty.SetSchemaModel(global);

        };

        SetSchemaModel();

        //MongoDb.Promise = global.Promise;
        
        let config = {
            Host : AppConfig.MongoDB.Host,
            Port : AppConfig.MongoDB.Port,
            User : AppConfig.MongoDB.User,
            Password : AppConfig.MongoDB.Password,
            Database : AppConfig.MongoDB.Database
        };

        let url = 'mongodb://' + config.User + ':' + config.Password + '@' + config.Host + ':' + config.Port + '/' + config.Database;
     
        //let url = 'mongodb://' + config.User + ':' + config.Password + '@' + config.Host + ':' + config.Port + '/' + config.Database + '?authSource=admin';
        //let url = 'mongodb://' + config.User + ':' + config.Password + '@' + config.Host + ':' + config.Port + '/' + config.Database + '?replicaSet=rs_myoffice';

        let option = {
            useNewUrlParser: true,
            useCreateIndex: true, 
            useUnifiedTopology: true,
            connectTimeoutMS: 1000, //10000
            reconnectInterval: 500
            //useFindAndModify: false
        };

        let ConnectDb = function() {
               
            MongoDb.connect(url, option);
            
        };

        ConnectDb();

        MongoDb.connection.on('connecting', function () {

            Log.Info('Mongo DB => connect to' + url);

        });

        MongoDb.connection.on('reconnectFailed', function () {

            Log.Info('Mongo DB => reconnectFailed...');

        });

        MongoDb.connection.on('connected', function () {

            Log.Info('Mongo DB => connect success');

        });

        /*
        MongoDb.connection.on('all', function () {

            Log.Info('Mongo DB => connect success');

        });
        */

        MongoDb.connection.on('disconnected', function () {

            Log.Info('Mongo DB => connection disconnected');

        });

        MongoDb.connection.on('error', function (err) {

            Log.Warn('Mongo DB => connection error: ' + err);

            MongoDb.connection.close(function () {

                Log.Info('Mongo DB auto reconnect every 5000 ms');

                setTimeout(ConnectDb, 5000);

            });
        });
    };
}

export default MongoDBProperty;