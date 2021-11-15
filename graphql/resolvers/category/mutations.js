const Category = use('App/Models/Category')

const mutations = {
  async createCategory (parent, args) {
    const category = await Category.create({ name: args.name, description: args.description })

    return category
  },

  async updateCategory (parent, args) {
    const category = await Category.findBy('id', args.id)
    category.$attributes.name = args.name ? args.name : category.$attributes.name
    category.$attributes.description = args.description ? args.description : category.$attributes.description

    category.save()

    return category
  }
}

module.exports = mutations
