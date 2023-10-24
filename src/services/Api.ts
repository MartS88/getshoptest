import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://phonenumbervalidatefree.p.rapidapi.com';

// 'X-RapidAPI-Key': '1a55f41869msh57e107389efbca9p1f7b7ajsn05ca6ad44b37',


export const Api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            headers.set('X-RapidAPI-Key', '0c3518427dmsh5fc3c6675087736p1d2bbdjsn82fc8a4c672a');
            headers.set('X-RapidAPI-Host', 'phonenumbervalidatefree.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        Phone: builder.query({
            query: (number) => ({
                url: `ts_PhoneNumberValidateTest.jsp`,
                params: { number, country: 'RU' },
            }),
        }),
    }),
});

export const { usePhoneQuery } = Api;













