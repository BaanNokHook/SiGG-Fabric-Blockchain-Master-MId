class OrdererSchemaModel {
    
    CreateSchema() {

        let Schema = MongoDb.Schema;
        
        let schema = {

            NETWORK_ID: { type: String, required: true, index: true },

            ORDERER_ID: { type: String, required: true, unique : true, index: true },
            ORDERER_NAME: { type: String, required: true, unique : true, index: true },

            HOST: { type: String },
            PORT: { type: String },

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
        
        let schemaModel = MongoDb.model("orderers", SchemaOption);

        Log.Debug('Orderer Schema Model: ' + JSON.stringify(schema));
        
        return schemaModel;
    }
}

export default OrdererSchemaModel;