import BaseService from "./BaseService";

export default class SettingsService extends BaseService {

    static getResource() {
        return 'settings'
    }

    static async getModules(){
        return await this.get({path:'modules'})
    }

    static async getFields(entity){
        return await this.get({path:`fields?entity=${entity}`})
    }
}