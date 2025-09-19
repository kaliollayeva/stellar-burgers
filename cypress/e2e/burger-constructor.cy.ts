describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-access-token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    // Мокаем ингредиенты и пользователя
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('http://localhost:4000');
  });

  it('должен отобразить ингредиенты в конструкторе', () => {
    cy.wait('@getIngredients');
    // Добавляем булку и начинку
    cy.get('[data-cy=constructor-ingredient-bun-1]').find('button').click();
    cy.get('[data-cy=constructor-ingredient-main-1]').find('button').click();
    // Проверяем наличие ингредиентов в конструкторе
    cy.get('[data-cy=constructor-ingredients]')
    .find('[data-cy=constructor-ingredients-item]')
    .contains('Начинка вкусная')
    cy.get('[data-cy=constructor-bun-top]')
      .contains('Классическая булка (верх)');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains('Классическая булка (низ)');
  });

  it('Открытие и закрытие модалки ингредиента', () => {
    // Открываем
    cy.get('[data-cy=constructor-ingredient-bun-1]').click();
    cy.get('[data-cy=modal-title]')
    .contains('Детали ингредиента');
    // Закрытие крестиком
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal-title]').should('not.exist');
    // Закрытие оверлеем
    cy.get('[data-cy=constructor-ingredient-bun-1]').click();
    cy.get('[data-cy=modal-title]')
    .contains('Детали ингредиента');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal-title]').should('not.exist');
  });

  it('Оформление заказа', () => {
    cy.get('[data-cy=constructor-ingredient-bun-1]').find('button').click();
    cy.get('[data-cy=constructor-ingredient-main-1]').find('button').click();
    // Жмём "Оформить заказ"
    cy.get('[data-cy=order-summ] button').click();
    // Ждём ответ с заказом
    cy.wait('@createOrder');
    // Проверяем номер заказа
    cy.get('[data-cy=order-number]', { timeout: 10000 }).contains('98765');
    // Закрываем модалку
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal-container]').should('not.exist');
    //Проверяется, что конструктор пуст.
    cy.get('[data-cy=constructor-bun-top-empty]')
      .contains('Выберите булки');
    cy.get('[data-cy=constructor-ingredients-empty]')
      .contains('Выберите начинку');
    cy.get('[data-cy=constructor-bun-bottom-empty]')
      .contains('Выберите булки');
  });
});
