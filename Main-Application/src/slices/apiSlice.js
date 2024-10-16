import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: "https://gateway-registry-system.onrender.com", credentials: "include" })


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (bulider) => ({}),
})