export const createRequest = () => ({
    type: "LIKES_REQUEST",
})

export const createSuccess = (comment) => ({
    type: "LIKES_SUCCESS",
    payload: comment,
})

