const Category = use('App/Models/Category')

const categoryQueries = {
  async categories () {
    const data = await Category.all()
    const categories = data.toJSON()

    return categories
  }
}

module.exports = categoryQueries
