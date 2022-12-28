class PeerSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            ORDERER_ID: { type: String, required: true, index: true },

            MEMBERSHIP_ID: { type: String, required: true, index: true },

            PEER_ID: { type: String, required: true, unique : true, index: true },
            PEER_NAME: { type: String, required: true, unique : true, index: true },
            
            HOST: { type: String },
            PORT: { type: String },
            
            CERT_TLS_ORDERER_PATH: { type: String },
            CERT_MSP_ORDERER_PATH: { type: String },
            CA_ORDER_FILE: { type: String },
            
            CERT_TLS_PEER_PATH: { type: String },
            CERT_MSP_PEER_PATH: { type: String },

            CERT_TLS_CLIENT_PATH: { type: String },
            CERT_MSP_CLIENT_PATH: { type: String },

            IS_ACTIVE: {type: Boolean},
            CREATE_BY: { type: String },
            UPDATE_BY: { type: String },
            CREATE_DATE: { type: Date },
            UPDATE_DATE: { type: Date }

        };

        let SchemaOption = new Schema(schema);

        SchemaOption.set('toJSON', {

            transform (doc, ret, options) {

                delete ret._id;
                delete ret.__v;

                return ret;
            }
            
        });
        
        let schemaModel = MongoDb.model("peers", SchemaOption);

        Log.Debug('Peer Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default PeerSchemaModel;