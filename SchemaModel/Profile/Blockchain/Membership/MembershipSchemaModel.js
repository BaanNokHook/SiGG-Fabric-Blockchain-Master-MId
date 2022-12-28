class MembershipSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            MEMBERSHIP_ID: { type: String, required: true, unique : true, index: true },
            MEMBERSHIP_NAME: { type: String, required: true, unique : true, index: true },

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
        
        let schemaModel = MongoDb.model("memberships", SchemaOption);

        Log.Debug('Membership Schema Model: ' + JSON.stringify(schema));

        return schemaModel;
    }
}

export default MembershipSchemaModel;