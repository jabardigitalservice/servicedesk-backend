const Category = use('App/Models/Category')

const queries = {
  async categories () {
    const categories = await Category.all()

    return categories.toJSON()
  },

  async getCategory (parent, args) {
    const category = await Category.findBy('id', args.id)

    return category
  }
}

module.exports = queries
