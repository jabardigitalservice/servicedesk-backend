'use strict'

const { test } = use('Test/Suite')('Category')
const Category = use('App/Models/Category')

test('isValid() should return true for valid category', async ({ assert }) => {
  const category = new Category('name', 'description')

  assert.isTrue(category.isValid())
})

test('isValid() should return false for empty name', async ({ assert }) => {
  const category = new Category(null, 'description')

  assert.isFalse(category.isValid())
})
