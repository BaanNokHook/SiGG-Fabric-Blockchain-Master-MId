//================== [START Import Modules] ================//
import MainProperty from './Main/Property/MainProperty.js';
import MongoDBProperty from "./BusinessData/MongoDB/MongoDBProperty.js";
//================== [END Import Modules] ==================//

//================== [START Set Root Path] =================//
global.RootPath = __dirname;
//================== [END Set Root Path] ===================//

//================== [ START Set Global ] ==================//
MainProperty.SetGlobal(global);
//================== [ END Set Global ] ====================//

//================== [ START Set Mongo DB ] ================//
MongoDBProperty.Connection(global);
//================== [ END Set Mongo DB ] ==================//

//================== [ START Create Host ] =================//
if(AppConfig.WebApp.EnableSSL === true) {

    HttpsServer.listen(AppConfig.WebApp.PortHttps, AppConfig.WebApp.Host, function () {

        let host = HttpsServer.address().address;
        let port = HttpsServer.address().port;
        //console.log('Is Secure => Running Port No. at https://' + host + ':' + port);
        Log.Info('Is Secure => Running Port No. at https://' + host + ':' + port);
    });
}
else {

    HttpServer.listen(AppConfig.WebApp.PortHttp, AppConfig.WebApp.Host, function () {

        let host = HttpServer.address().address;
        let port = HttpServer.address().port;
        //console.log('Is not Secure => Running Port No. at http://' + host + ':' + port);
        Log.Info('Is not Secure => Running Port No. at http://' + host + ':' + port);
    });
}
//================== [ END Create Host ] ====================//

//================== [ START Using Controller ] =============//

//Main
    import MainController from './Controller/MainController.js';
    MainController.SetController();

//Profile

    //Blockchain

        //Membership
            import MembershipController from './Controller/Profile/Blockchain/Membership/MembershipController.js';
            MembershipController.SetController();

        //Network
            import NetworkController from './Controller/Profile/Blockchain/Network/NetworkController.js';
            NetworkController.SetController();

        //Orderer
            import OrdererController from './Controller/Profile/Blockchain/Orderer/OrdererController.js';
            OrdererController.SetController();

        //Peer
            import PeerController from './Controller/Profile/Blockchain/Peer/PeerController.js';
            PeerController.SetController();

        //Chaincode
            import ChaincodeController from './Controller/Profile/Blockchain/Chaincode/ChaincodeController.js';
            ChaincodeController.SetController();

        //Channel
            import ChannelController from './Controller/Profile/Blockchain/Channel/ChannelController.js';
            ChannelController.SetController();

    //Genneral

        //System
            import SystemController from './Controller/Profile/Genneral/System/SystemController.js';
            SystemController.SetController();

        //System
            import PartyController from './Controller/Profile/Genneral/Party/PartyController.js';
            PartyController.SetController();
//Setting

    //SystemConfig
    import SystemConfigController from './Controller/Setting/SystemConfig/SystemConfigController.js';
    SystemConfigController.SetController();

//================== [ END Using Controller ] ===============//