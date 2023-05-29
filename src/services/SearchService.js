import BaseService from "./BaseService";

export default class SearchService extends BaseService {

    static getResource() {
        return 'search'
    }

    static async getTotal( entity, field, vsField ){
        return await this.get({path:`total?entity=${entity}&field=${field}&vsField=${vsField}`})
    }

}