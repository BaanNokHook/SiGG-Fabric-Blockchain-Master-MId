
class LogProvider {
    
    constructor(session) {
        this.Session = session || "::";
    }

    Info(...msg) {
        if(AppConfig.AppLog === 'Info') {
            MasterLog.LogKb.info(this.Session, ...msg);
        }
        else if(AppConfig.AppLog === 'Debug') {
            MasterLog.LogKb.debug(this.Session, ...msg);
        }
    }

    Debug(...msg) {
        if(AppConfig.AppLog === 'Debug') {
            MasterLog.LogKb.debug(this.Session, ...msg);
        }
    }

    Error(...msg) {
        MasterLog.LogKb.error(this.Session, ...msg);
    }

    Warn(...msg) {
        MasterLog.LogKb.warn(this.Session, ...msg);
    }
}

export default LogProvider;