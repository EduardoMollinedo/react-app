import axios from "axios";

const baseUrl = "http://localhost:65501/api/"



export default {

    producto(url = baseUrl + 'producto/') {
        return {
            getAll: (categoria) => axios.get(url , "f"),
            //getFrutas:  ()=> axios.get(url,"f" ),
            //getVerduras: () => axios.get(url,"v"),
            getById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}