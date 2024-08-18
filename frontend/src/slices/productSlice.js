import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      providesTags: ["Product"],
    }),
    addPfoduct: builder.mutation({
      query: () => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"]
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCT_URL}/${product._id}`,
        method: "PUT",
        body: product
      }),
      invalidatesTags: ["Product"],
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddPfoductMutation, useUpdateProductMutation } = productSlice;
