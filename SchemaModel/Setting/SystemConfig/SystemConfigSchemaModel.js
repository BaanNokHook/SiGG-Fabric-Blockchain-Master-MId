class SystemConfigSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            SYSTEM_ID: { type: String, required: true },
            PARTY_ID: { type: String, required: true },
            PARTNER_ID: { type: String, required: true },
            NETWORK_ID: { type: String, required: true },
            ORDERER_ID: { type: String, required: true },
            CHAINCODE_ID: { type: String, required: true },
            CHANNEL_ID: { type: String, required: true },
            PEER_ID: { type: String, required: true }

        };

        let SchemaOption = new Schema(schema);

        SchemaOption.index({

            SYSTEM_ID: 1, 
            PARTY_ID: 1, 
            PARTNER_ID: 1,
            NETWORK_ID: 1, 
            ORDERER_ID: 1, 
            CHAINCODE_ID: 1, 
            CHANNEL_ID: 1,
            PEER_ID: 1

        },{ 
            unique: true 
        });

        SchemaOption.set('toJSON', {

            transform (doc, ret, options) {

                delete ret._id;
                delete ret.__v;

                return ret;
            }
            
        });
        
        let schemaModel = MongoDb.model("systemconfigs", SchemaOption);

        Log.Debug('Systemconfig Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default SystemConfigSchemaModel;