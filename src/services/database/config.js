const CHAMPIONSHIP_SCHEMA = 'Championship';
const TEAM_SCHEMA = 'Team';
const PLAYER_SCHEMA = 'Player';
const GAME_SCHEMA = 'Game';
const PLAY_SCHEMA = 'Play';
const UDA_SCHEMA = 'UDA';

const ChampionshipSchema = {
  name: CHAMPIONSHIP_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    createdAt: 'date',
    pictureURI: 'string',
    teams: { type: 'list', objectType: TEAM_SCHEMA },
    games: { type: 'list', objectType: GAME_SCHEMA },
  },
};

const TeamSchema = {
  name: TEAM_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    championshipId: 'string',
    name: 'string',
    createdAt: 'date',
    pictureURI: 'string',
    players: { type: 'list', objectType: PLAYER_SCHEMA },
  },
};

const PlayerSchema = {
  name: PLAYER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    teamId: 'string',
    name: 'string',
    createdAt: 'date',
    pictureURI: 'string',
    number: 'int',
    xPos: 'float',
    yPos: 'float',
  },
};

const GameSchema = {
  name: GAME_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    championshipId: 'string',
    createdAt: 'date',
    date: 'date',
    homeDone: { type: 'bool', default: false },
    awayDone: { type: 'bool', default: false },
    homeId: 'string',
    awayId: 'string',
    homePlays: { type: 'list', objectType: PLAY_SCHEMA },
    awayPlays: { type: 'list', objectType: PLAY_SCHEMA },
  },
};

const PlaySchema = {
  name: PLAY_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    gameId: 'string',
    type: 'string',
    finishedAt: 'int',
    udas: { type: 'list', objectType: UDA_SCHEMA },
  },
};

const UDASchema = {
  name: UDA_SCHEMA,
  properties: {
    senderId: 'string',
    receiverId: 'string',
  },
};

export default {
  path: 'iLab.realm',
  schema: [ChampionshipSchema, TeamSchema, PlayerSchema, GameSchema, PlaySchema, UDASchema],
  schemaVersion: 8,
};

export {
  CHAMPIONSHIP_SCHEMA, TEAM_SCHEMA, PLAYER_SCHEMA, GAME_SCHEMA, PLAY_SCHEMA, UDA_SCHEMA,
};
