export const createRequest = () => ({
    type: "CREATE_REQUEST",
})

export const createSuccess = (comment) => ({
    type: "CREATE_SUCCESS",
    payload: comment,
})