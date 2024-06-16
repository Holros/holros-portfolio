import { createSlice } from "@reduxjs/toolkit"

const headingOptions = {
    name: "heading",
    initialState: {
        value: "HOME"
    },
    reducers: {
        setHeading: (state, action) => {
            state.value = action.payload
        }
    }
}

const headingSlice = createSlice(headingOptions)

export const {setHeading} = headingSlice.actions
export default headingSlice.reducer