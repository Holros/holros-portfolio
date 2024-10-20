import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: string
}

const initialState: InitialState = {
    value: "HOME"
}

const headingOptions = {
    name: "heading",
    initialState,
    reducers: {
        setHeading: (state: InitialState, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
}

const headingSlice = createSlice(headingOptions)

export const {setHeading} = headingSlice.actions
export default headingSlice.reducer