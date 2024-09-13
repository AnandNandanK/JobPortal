import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs:[],
        searchJobByText:"",
        allAppliedJob:[],
        searchQuery:""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {  // Corrected to 'setSingleJob'
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {  
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {  
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {  
            state.allAppliedJob = action.payload;
        },
        setSearchQuery: (state, action) => {  
            state.searchQuery = action.payload;
        },
    },
});

export const { setAllJobs, setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchQuery} = jobSlice.actions;  // Corrected to 'setSingleJob'
export default jobSlice.reducer;
