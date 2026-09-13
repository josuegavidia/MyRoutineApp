import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductReview } from "../../utils/types/Skincare";

type SkincareState = {
  products: Product[];
};

const initialState: SkincareState = {
  products: [],
};

const skincareSlice = createSlice({
  name: "skincare",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addReview: (
      state,
      action: PayloadAction<{ productId: string; review: ProductReview }>,
    ) => {
      const { productId, review } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.review = review;
      }
    },
  },
});

export const { addProduct, deleteProduct, addReview } = skincareSlice.actions;
export default skincareSlice.reducer;
