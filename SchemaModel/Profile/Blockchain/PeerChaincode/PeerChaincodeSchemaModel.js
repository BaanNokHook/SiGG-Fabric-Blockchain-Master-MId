class PeerChaincodeSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            PEER_ID: { type: String, required: true },
            CHAINCODE_ID: { type: String, required: true }

        };

        let SchemaOption = new Schema(schema);

        SchemaOption.index({PEER_ID: 1, CHAINCODE_ID: 1}, { unique: true });

        SchemaOption.set('toJSON', {

            transform (doc, ret, options) {

                delete ret._id;
                delete ret.__v;

                return ret;
            }
            
        });
        
        let schemaModel = MongoDb.model("peers_chaincodes", SchemaOption);

        Log.Debug('Peer Chaincode Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default PeerChaincodeSchemaModel;