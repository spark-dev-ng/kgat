import { API_START, API_FINISH } from "../../redux/constants/actionTypes"

export const apiStart = (label) => ({
    type: API_START,
    payload: {
        label
    }
});

export const apiFinish = (label) => ({
    type: API_FINISH,
    payload: {
        label
    }
});