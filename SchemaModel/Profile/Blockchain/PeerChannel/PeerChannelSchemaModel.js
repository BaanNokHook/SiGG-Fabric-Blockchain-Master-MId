class PeerMembershipSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            PEER_ID: { type: String, required: true },
            CHANNEL_ID: { type: String, required: true }

        };

        let SchemaOption = new Schema(schema);

        SchemaOption.index({PEER_ID: 1, CHANNEL_ID: 1}, { unique: true });

        SchemaOption.set('toJSON', {

            transform (doc, ret, options) {

                delete ret._id;
                delete ret.__v;

                return ret;
            }
            
        });
        
        let schemaModel = MongoDb.model("peers_channels", SchemaOption);

        Log.Debug('Peer Channel Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default PeerMembershipSchemaModel;