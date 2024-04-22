import { configureStore } from "@reduxjs/toolkit";
import { houseApi } from "services/houses";
import { orderApi } from "services/orders";
import { requestApi } from "services/requests";
import { statsApi } from "services/stats";
import { dashboardApi } from "services/dashboard";
import globalReducer from "state";
import houseReducer from "../state/housesSlice";
import requestReducer from "../state/requestsSlice";
import orderReducer from "../state/ordersSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    houses: houseReducer,
    requests: requestReducer,
    orders: orderReducer,
    [houseApi.reducerPath]: houseApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [requestApi.reducerPath]: requestApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(houseApi.middleware)
      .concat(requestApi.middleware)
      .concat(orderApi.middleware)
      .concat(statsApi.middleware)
      .concat(dashboardApi.middleware),
});
