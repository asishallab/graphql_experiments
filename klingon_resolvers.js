const db = require('./db.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports.isBlank = function(x) {
  if (x === undefined || x === null || (x === '' && typeof x === 'string') ||
    (x.length === 0 && Array.isArray(x))) {
    return true
  } else {
    return false
  }
}

module.exports.generateOrderArg = function({
  field,
  direction
}) {
  if (module.exports.isBlank(direction)) {
    direction = 'ASC'
  }
  return [field, direction]
}

module.exports.generateOperatorValueArg = function({
  operator,
  value
}) {
  if (module.exports.isBlank(operator)) {
    o = Op['eq']
  } else {
    o = Op[operator]
  }
  ova = {}
  ova[o] = value
  return ova
}

module.exports.generateSearchArg = function({
  field,
  operator,
  value,
  searchArgs
}) {
  sa = {}
  if (!module.exports.isBlank(searchArgs)) {
    sa[field] = searchArgs.map(module.exports.generateSearchArg)
  } else {
    if (module.exports.isBlank(operator)) v = value
    else v = {
      [Op[operator]]: value
    }
    sa[field] = v
  }
  return sa
}

module.exports.readArg = function({
  limit,
  offset,
  orderArgs,
  searchArg
}) {
  ra = {}
  if (!module.exports.isBlank(orderArgs)) {
    ra.order = orderArgs.map(module.exports.generateOrderArg)
  }
  if (!module.exports.isBlank(limit)) {
    ra.limit = limit
  }
  if (!module.exports.isBlank(offset)) {
    ra.offset = offset
  }
  if (!module.exports.isBlank(searchArg)) {
    ra.where = module.exports.generateSearchArg(searchArg)
  }
  return ra
}

module.exports.allKlingons = function({
  limit,
  offset,
  orderArgs,
  searchArg
}) {
  console.log(
    `Arguments received by method allKlingons are:\nlimit: ${limit}, offset: ${offset}, orderArgs: ${JSON.stringify(orderArgs)}, searchArg: ${JSON.stringify(searchArg)}`
  );
  return db.Klingon.findAll(module.exports.generateSearchArg(limit, offset,
    orderArgs, searchArg))
}

module.exports.klingonById = function({
  id
}) {
  return db.Klingon.findOne({
    where: {
      id: id
    }
  })
}
