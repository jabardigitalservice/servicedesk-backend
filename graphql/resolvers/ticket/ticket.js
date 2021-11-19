const Category = use('App/Models/Category')

const ticket = {
  async categoryByCategoryId (parent) {
    return await Category.findOrFail(parent.category_id)
  }
}

module.exports = ticket
