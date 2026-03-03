import { TIngredient } from '../types';

export const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Классическая булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 240,
    price: 100,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02.png'
  },
  {
    _id: 'sauce-1',
    name: 'Фирменный соус',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 20,
    price: 50,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02.png'
  },
  {
    _id: 'main-1',
    name: 'Начинка вкусная',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 2,
    calories: 300,
    price: 250,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01.png'
  },
  {
    _id: 'main-2',
    name: 'Сырный ломтик',
    type: 'main',
    proteins: 7,
    fat: 9,
    carbohydrates: 1,
    calories: 110,
    price: 60,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad.png'
  }
];
