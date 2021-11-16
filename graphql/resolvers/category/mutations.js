const Category = use('App/Models/Category')

const mutations = {
  async createCategory (parent, args) {
    const category = new Category()

    category.name = args.name
    category.description = args.description
    await category.save()

    return category
  },

  async updateCategory (parent, args) {
    const category = await Category.findBy('id', args.id)

    category.name = args.name ? args.name : category.name
    category.description = args.description ? args.description : category.description
    category.save()

    return category
  },

  async deleteCategory (parent, args) {
    const category = await Category.findBy('id', args.id)

    return await category.delete()
  }
}

module.exports = mutations
