import BaseService from "./BaseService";

export default class ModulesService extends BaseService {

    static getResource() {
        return 'modules'
    }

    static async getAll(){
        return await this.get({path:'all'})
    }
}