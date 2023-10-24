import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'https://apilayer.net/api/'

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({
        baseUrl,

    }),
    endpoints: (builder) => ({
        Phone: builder.query({
            query: (number) => `validate?access_key=0ddc262dc3d31a3f18e738ad70041811&number=${number}&country_code=RU&format=1`
        }),
    })
})

export const {
    usePhoneQuery,

} = Api;


// http://apilayer.net/api/validate?access_key=0ddc262dc3d31a3f18e738ad70041811&number=9312467973&country_code=RU