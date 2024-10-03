import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000', // Use your proxy server URL
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/top-charts',
    }),
    getSongDetails: builder.query({
      query: (songId) => `/songs/details?song_id=${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `/songs/related?song_id=${songId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamApi;
