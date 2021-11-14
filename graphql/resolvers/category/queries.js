const Category = use('App/Models/Category')

const categoryQueries = {
  async categories (parent, args) {
    const data = args.id ? await Category.findBy('id', args.id) : await Category.all()
    const categories = args.id ? [data.toJSON()] : data.toJSON()

    return categories
  }
}

module.exports = categoryQueries
