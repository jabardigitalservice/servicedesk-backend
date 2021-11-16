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

    try {
      category.$attributes.name = args.name ? args.name : category.$attributes.name
      category.$attributes.description = args.description ? args.description : category.$attributes.description
      category.save()
    } catch {
      throw new Error('User not found')
    }

    return category
  },

  async deleteCategory (parent, args) {
    const category = await Category.findBy('id', args.id)

    try {
      await category.delete()
    } catch {
      throw new Error('User not found')
    }

    return (await Category.all()).toJSON()
  }
}

module.exports = mutations
