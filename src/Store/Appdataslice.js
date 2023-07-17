import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sid: null,
    user: { islogged: false, userdata:{} },
}

export const Appdataslice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        userUpdate: (state, action) => {

            state.user = action.payload.data;
        }


    },
})

// Action creators are generated for each case reducer function
export const { userUpdate } = Appdataslice.actions

export default Appdataslice.reducer