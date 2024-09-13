import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        allCompany:[],
        getCompanyByText:"",
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload
        },
        setAllCompany:(state,action)=>{
            state.allCompany=action.payload
        },
        setCompanyByText:(state,action)=>{
            state.getCompanyByText=action.payload
        },
    }
})

export const {setSingleCompany,setAllCompany,setCompanyByText}=companySlice.actions;
export default companySlice.reducer;