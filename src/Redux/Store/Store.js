import { configureStore } from "@reduxjs/toolkit";
import NavbarSlice from "../Features/NavbarSlice";

export const store= configureStore({
    reducer:{
        navbar:NavbarSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['yourNonSerializableAction'],
        // Or ignore certain paths:
        // ignoredPaths: ['some.path.to.ignore']
      },
    }),
})