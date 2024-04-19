import { fetchContacts, deleteContact } from "./contactsOps";
import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, () => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => {
          return contact.id !== action.payload;
        });
      })
      .addCase(deleteContact.rejected, () => {
        state.loading = false;
        state.error = true;
      }),
});

// export const { addContact, deleteContact } = contactsSlice.actions;

export const selectContacts = (state) => state.contacts.items;

export default contactsSlice.reducer;
