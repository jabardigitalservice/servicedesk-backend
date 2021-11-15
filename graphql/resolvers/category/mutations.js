const Category = use('App/Models/Category')

const mutations = {
  async createCategory (parent, args) {
    const category = await Category.create({ name: args.name, description: args.description })

    return category
  }
}

module.exports = mutations
