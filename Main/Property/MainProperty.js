//================== [START Import Modules] =================//
import path from 'path';
import fs from 'fs';
import request from 'request';
import express from 'express';

import mstring from 'mstring';
import moment from 'moment';
import shelljs from 'shelljs';
import validatorjs from 'validatorjs';

import bodyParser from 'body-parser';

import https from 'https';
import http from 'http';

import MasterLogProvider from '../../Provider/Log/MasterLogProvider.js';
import LogProvider from '../../Provider/Log/LogProvider.js';
import MasterGenProvider from '../../Provider/MasterGen/MasterGenProvider.js';
import ValidateProvider from '../../Provider/Validate/ValidateProvider.js';
//================== [END Import Modules] =================//

class MainProperty {

    constructor() {

    }

    static SetGlobal(global) {

        //================== [ START Node Modules Require ] ==========//
        global.Path = path;
        global.Fs = fs;
        global.Request = request;
        
        global.Express = express;
        global.App = Express();        
        //================== [ END Node Modules Require ] ============//

        //================== [ START App Config ] ====================//
        global.AppConfig = JSON.parse(Fs.readFileSync(Path.join(RootPath + "/../config/JsonConfig.json"), "utf8"));
        //================== [ END App Config ] ======================//

        //================== [ START Node Modules Option ] ===========//
        global.Mstring = mstring;
        global.Moment = moment;
        global.Shell = shelljs;
        global.Validator = validatorjs;
        //================== [ END Node Modules Option ] =============//

        //================== [START Server Setting ] =================//
        if(AppConfig.WebApp.EnableSSL === true) {

            let Certificate = {
                key: Fs.readFileSync(Path.join(RootPath + "/../config/TLS/privkey.pem"), 'utf8'),
                cert: Fs.readFileSync(Path.join(RootPath + "/../config/TLS/cert.pem"), 'utf8')
            };

            global.HttpsServer = https.createServer(Certificate, App);
        }
        else {

            global.HttpServer = http.createServer(App);
        }
        
        let BodyParser = bodyParser;
        App.use(BodyParser.urlencoded({limit: '50mb', extended: true }));
        App.use(BodyParser.json({limit: '50mb'}));
        
        global.RootUrl = AppConfig.WebApp.AppName + AppConfig.WebApp.AppType + AppConfig.WebApp.AppVersion;

        if(AppConfig.WebApp.EnableSSL === true) {

            global.ApiPath = 'https://' + AppConfig.WebApp.Domain + ':' + AppConfig.WebApp.PortHttps + RootUrl;

        }
        else {
        
            global.ApiPath = 'http://' + AppConfig.WebApp.Domain + ':' + AppConfig.WebApp.PortHttp + RootUrl;

        }

        if(AppConfig.Mode === 'Dev' || AppConfig.Mode === 'Test') {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
        //================== [END Server Setting ] ==================//
        
        //================== [ START Provider ] =====================//
        global.MasterLog = new MasterLogProvider();
        global.Log = new LogProvider();
        
        global.MasterGen = new MasterGenProvider();
        global.Validate = new ValidateProvider();
        //================== [ END Provider ] =======================//
    }    
}

export default MainProperty;