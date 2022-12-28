class ChannelMembershipSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            CHANNEL_ID: { type: String, required: true },
            MEMBERSHIP_ID: { type: String, required: true }

        };

        let SchemaOption = new Schema(schema);
        
        SchemaOption.index({CHANNEL_ID: 1, MEMBERSHIP_ID: 1}, { unique: true });

        SchemaOption.set('toJSON', {

            transform (doc, ret, options) {

                delete ret._id;
                delete ret.__v;

                return ret;
            }
            
        });
        
        let schemaModel = MongoDb.model("channels_memberships", SchemaOption);

        Log.Debug('Channel Membership Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default ChannelMembershipSchemaModel;