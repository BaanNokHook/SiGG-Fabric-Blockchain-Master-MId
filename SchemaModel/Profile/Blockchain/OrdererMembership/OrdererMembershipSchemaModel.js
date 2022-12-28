class OrdererChannelSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            ORDERER_ID: { type: String, required: true },
            MEMBERSHIP_ID: { type: String, required: true }

        };

        let SchemaOption = new Schema(schema);

        SchemaOption.index({ORDERER_ID: 1, MEMBERSHIP_ID: 1}, { unique: true });

        SchemaOption.set('toJSON', {

            transform (doc, ret, options) {

                delete ret._id;
                delete ret.__v;

                return ret;
            }
            
        });
        
        let schemaModel = MongoDb.model("orderers_memberships", SchemaOption);

        Log.Debug('Orderer Membership Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default OrdererChannelSchemaModel;