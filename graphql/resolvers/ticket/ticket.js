const Category = use('App/Models/Category')

const ticket = {
  async category (parent) {
    return await Category.findOrFail(parent.category_id)
  }
}

module.exports = ticket
