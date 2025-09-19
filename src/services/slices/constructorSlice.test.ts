import { constructorSlice, addIngredient, removeIngredient } from './constructorSlice';
import type { TConstructorIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const reducer = constructorSlice.reducer;

  const mockingredient: TConstructorIngredient = {
    _id: '123',
    name: 'Булка вкусная',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'test.png',
    image_large: 'test-large.png',
    image_mobile: 'test-mobile.png',
    id: 'uuid-123' // это поле потом перезапишется на uuid
  };

  it('должен добавить ингредиент', () => {
    const initialState = reducer(undefined, { type: '' });

    const state = reducer(initialState, addIngredient(mockingredient));

    expect(state.constructorItems.ingredients.length).toBe(1);

    const added = state.constructorItems.ingredients[0];

    // проверяем что основные поля совпали
    expect(added).toMatchObject({
      _id: mockingredient._id,
      name: mockingredient.name,
      type: mockingredient.type,
      price: mockingredient.price,
      image: mockingredient.image
    });

    // проверяем что id перезаписался
    expect(added.id).toBeDefined();
    expect(added.id).not.toBe(mockingredient.id);
  });

  it('должен удалить ингредиент по id', () => {
    const initialState = reducer(undefined, { type: '' });

    const stateWithIngredient = reducer(initialState, addIngredient(mockingredient));
    const addedId = stateWithIngredient.constructorItems.ingredients[0].id;

    const stateAfterRemove = reducer(stateWithIngredient, removeIngredient(addedId));

    expect(stateAfterRemove.constructorItems.ingredients).toHaveLength(0);
  });
});
