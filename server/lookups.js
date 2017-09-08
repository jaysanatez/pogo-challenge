var Role = {
  ADMIN: {
    key: 1,
    value: 'Admin',
  },
  TRAINER: {
    key: 2,
    value: 'Trainer',
  },
}

var Status = {
  VERIFIED: {
    key: 1,
    value: 'Verified',
  },
  CREATED: {
    key: 2,
    value: 'Created',
  },
  DISABLED: {
    key: 3,
    value: 'Disabled',
  },
}

var Team = {
  VALOR: {
    key: 1,
    value: 'Valor',
  },
  MYSTIC: {
    key: 2,
    value: 'Mystic',
  },
  INSTINCT: {
    key: 3,
    value: 'Instinct',
  },
}

var getText = (obj, key) => {
  var val;
  Object.keys(obj).forEach(prop => {
    if (obj[prop].key == key) {
      val = obj[prop].value
    }
  })

  return val
}

module.exports = {
  Role,
  Status,
  Team,
  getText,
}
