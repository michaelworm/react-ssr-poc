import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const catFactsSlice = createSlice({
  name: "catFacts",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCatFacts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const fetchCatFacts = createAsyncThunk(
  "catFacts/fetchCatFacts",
  async () => {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await Promise.all([
      response.json(),
      new Promise(resolve => setTimeout(resolve, 5000)) // sleep for 5 seconds
    ]);

    return data[0];
  }
);

export const { catFactAdded } = catFactsSlice.actions;
export default catFactsSlice.reducer;
