import { rootReducer } from "./rootReducer";
import { ingredientsSlice } from "./slices/ingredientsSlice";
import { constructorSlice } from "./slices/constructorSlice";
import { userSlice } from "./slices/userSlice";
import { ordersSlice } from "./slices/ordersSlice";
import { feedSlice } from "./slices/feedSlice";

describe("rootReducer", () => {
  it("должен вернуть корректное начальное состояние при неизвестном экшене", () => {
    const initialState = rootReducer(undefined, { type: "UNKNOWN_ACTION" });

    expect(initialState).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      constructorData: constructorSlice.getInitialState(),
      user: userSlice.getInitialState(),
      orders: ordersSlice.getInitialState(),
      feed: feedSlice.getInitialState(),
    });
  });
});
