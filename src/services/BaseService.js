
export default class BaseService {

    static getResource() {
        return ''
    }


    static async get({path}) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${this.getResource}/${path}`,{
            headers:{
                user_id:1
            }
        })
        return response.json()
    }

}