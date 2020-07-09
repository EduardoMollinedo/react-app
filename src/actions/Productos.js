import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    GET_ALL: 'GET_ALL',
}

const formateData = data => ({
    ...data,
    stock: parseInt(data.stock ? data.stock : 0)
})
export const getFrutas = () => dispatch => {
   
}
export const getVerduras = () => dispatch => {
   
}
export const getAll = (category) => dispatch => {
    console.log(category);
    api.producto().getAll(category)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.GET_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.producto().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
export const Delete = (id, onSuccess) => dispatch => {
    api.producto().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.producto().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}



