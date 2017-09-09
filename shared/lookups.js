const Role = {
  ADMIN: 1,
  TRAINER: 2,
}

const RoleStrings = [
  '',
  'Admin',
  'Trainer',
]

const Status = {
  VERIFIED: 1,
  CREATED: 2,
  DISABLED: 3,
}

const StatusStrings = [
  '',
  'Verified',
  'Created',
  'Disabled',
]

const Team = {
  VALOR: 1,
  MYSTIC: 2,
  INSTINCT: 3,
}

const TeamStrings = [
  '',
  'Valor',
  'Mystic',
  'Instinct',
]

module.exports = {
  Role,
  Status,
  Team,
  RoleStrings,
  StatusStrings,
  TeamStrings,
}
