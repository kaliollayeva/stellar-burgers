import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import type { TConstructorIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const reducer = constructorSlice.reducer;

  const mockIngredient1: TConstructorIngredient = {
    _id: '111',
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
    id: 'uuid-111' // перезапишется uuid-ом
  };

  const mockIngredient2: TConstructorIngredient = {
    _id: '222',
    name: 'Котлета сочная',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 30,
    calories: 300,
    price: 200,
    image: 'test2.png',
    image_large: 'test2-large.png',
    image_mobile: 'test2-mobile.png',
    id: 'uuid-222'
  };

  it('должен добавить ингредиент', () => {
    const initialState = reducer(undefined, { type: '' });

    const state = reducer(initialState, addIngredient(mockIngredient1));

    expect(state.constructorItems.ingredients.length).toBe(1);

    const added = state.constructorItems.ingredients[0];

    // проверяем что основные поля совпали
    expect(added).toMatchObject({
      _id: mockIngredient1._id,
      name: mockIngredient1.name,
      type: mockIngredient1.type,
      price: mockIngredient1.price,
      image: mockIngredient1.image
    });

    // проверяем что id перезаписался
    expect(added.id).toBeDefined();
    expect(added.id).not.toBe(mockIngredient1.id);
  });

  it('должен удалить ингредиент по id', () => {
    const initialState = reducer(undefined, { type: '' });

    const stateWithIngredient = reducer(
      initialState,
      addIngredient(mockIngredient1)
    );
    const addedId = stateWithIngredient.constructorItems.ingredients[0].id;

    const stateAfterRemove = reducer(
      stateWithIngredient,
      removeIngredient(addedId)
    );

    expect(stateAfterRemove.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен переместить ингредиент', () => {
    const initialState = reducer(undefined, { type: '' });

    // добавляем два ингредиента
    const stateWithTwo = reducer(
      reducer(initialState, addIngredient(mockIngredient1)),
      addIngredient(mockIngredient2)
    );

    const idsBefore = stateWithTwo.constructorItems.ingredients.map(
      (i) => i._id
    );
    expect(idsBefore).toEqual(['111', '222']);

    // двигаем второй элемент на место первого
    const stateAfterMove = reducer(
      stateWithTwo,
      moveIngredient({ fromIndex: 1, toIndex: 0 })
    );

    const idsAfter = stateAfterMove.constructorItems.ingredients.map(
      (i) => i._id
    );
    expect(idsAfter).toEqual(['222', '111']);
  });
});
