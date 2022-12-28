//================== [START Import Modules] =================//

import ChaincodeSchemaModel from './Profile/Blockchain/Chaincode/ChaincodeSchemaModel.js';
import ChaincodeMembershipSchemaModel from './Profile/Blockchain/ChaincodeMembership/ChaincodeMembershipSchemaModel.js';

import ChannelSchemaModel from './Profile/Blockchain/Channel/ChannelSchemaModel.js';
import ChannelMembershipSchemaModel from './Profile/Blockchain/ChannelMembership/ChannelMembershipSchemaModel.js';

import MembershipSchemaModel from './Profile/Blockchain/Membership/MembershipSchemaModel.js';

import NetworkSchemaModel from './Profile/Blockchain/Network/NetworkSchemaModel.js';

import OrdererSchemaModel from './Profile/Blockchain/Orderer/OrdererSchemaModel.js';
import OrdererMembershipSchemaModel from './Profile/Blockchain/OrdererMembership/OrdererMembershipSchemaModel.js';

import PeerSchemaModel from './Profile/Blockchain/Peer/PeerSchemaModel.js';
import PeerChaincodeSchemaModel from './Profile/Blockchain/PeerChaincode/PeerChaincodeSchemaModel.js';
import PeerChannelSchemaModel from './Profile/Blockchain/PeerChannel/PeerChannelSchemaModel.js';

import PartySchemaModel from './Profile/Genneral/Party/PartySchemaModel.js';

import SystemSchemaModel from './Profile/Genneral/System/SystemSchemaModel.js';

import SystemConfigSchemaModel from './Setting/SystemConfig/SystemConfigSchemaModel.js';

//================== [END Import Modules] =================//

class SchemaModelProperty {
    
    constructor() {

    }

    static SetSchemaModel(global) {

        global.Schema = {

            ChaincodeSchema: (new ChaincodeSchemaModel()).CreateSchema(),
            ChaincodeMembershipSchema: (new ChaincodeMembershipSchemaModel()).CreateSchema(),
            
            ChannelSchema: (new ChannelSchemaModel()).CreateSchema(),
            ChannelMembershipSchema: (new ChannelMembershipSchemaModel()).CreateSchema(),
            
            MembershipSchema: (new MembershipSchemaModel()).CreateSchema(),
            
            NetworkSchema: (new NetworkSchemaModel()).CreateSchema(),
            
            OrdererSchema: (new OrdererSchemaModel()).CreateSchema(),
            OrdererMembershipSchema: (new OrdererMembershipSchemaModel()).CreateSchema(),
            
            PeerSchema: (new PeerSchemaModel()).CreateSchema(),
            PeerChaincodeSchema: (new PeerChaincodeSchemaModel()).CreateSchema(),
            PeerChannelSchema: (new PeerChannelSchemaModel()).CreateSchema(),
            
            PartySchema: (new PartySchemaModel()).CreateSchema(),
            
            SystemSchema: (new SystemSchemaModel()).CreateSchema(),
            
            SystemConfigSchema: (new SystemConfigSchemaModel()).CreateSchema()
        }

        Log.Info('Schema Model => Create Success');

    }
};

export default SchemaModelProperty;