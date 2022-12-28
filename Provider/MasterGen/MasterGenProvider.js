
class MasterGenProvider {
    
    constructor() {

    }

    GenTid() {

        return AppConfig.NodeName + '-' + Moment().format('YYMMDD') + new Array(11).join().replace(/(.|$)/g, function () {
            
            return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']();

        });

    }

    GenJWTId() {

        return new Array(12).join().replace(/(.|$)/g, function () {

            return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']();

        });

    }

    GenXsession() {

        return new Array(22).join().replace(/(.|$)/g, function () {

            return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']();

        });
    }
}

export default MasterGenProvider;