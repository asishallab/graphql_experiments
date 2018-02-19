"use strict";

module.exports = class {
  constructor(model) {
    this.model = model
  }

  read(searchArg) {
    console.log("Got searchArg: " + JSON.stringify(searchArg));
    return this.model.findAll(searchArg)
  }

  readSingleById({id}) {
    return this.model.find({where: {id: id}})
  }

  readMany(searchArg) {
    return this.model.find({where: searchArg})
  }

  create(x) {
    return this.model.create(x)
  }

  update(x) {
    return this.model.find({
      where: {
        id: x.id
      }
    }).then(function(y) {
      return y.updateAttributes(x)
    })
  }

  delete(x) {
    return this.model.destroy({
      where: {
        id: x.id
      }
    })
  }
}
