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
    championship: { type: 'linkingObjects', objectType: CHAMPIONSHIP_SCHEMA, property: 'teams' },
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
    team: { type: 'linkingObjects', objectType: TEAM_SCHEMA, property: 'players' },
    name: 'string',
    createdAt: 'date',
    pictureURI: 'string',
    number: 'int',
    x_pos: 'float',
    y_pos: 'float',
    players: { type: 'list', objectType: PLAYER_SCHEMA },
  },
};

const GameSchema = {
  name: GAME_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    championship: { type: 'linkingObjects', objectType: CHAMPIONSHIP_SCHEMA, property: 'games' },
    createdAt: 'date',
    date: 'date',
    done: { type: 'bool', default: false },
    home_id: 'string',
    away_id: 'string',
    plays: { type: 'list', objectType: PLAY_SCHEMA },
  },
};

const PlaySchema = {
  name: PLAY_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    game: { type: 'linkingObjects', objectType: GAME_SCHEMA, property: 'plays' },
    type: 'string',
    finished_at: 'int',
    udas: { type: 'list', objectType: UDA_SCHEMA },
  },
};

const UDASchema = {
  name: UDA_SCHEMA,
  properties: {
    play: { type: 'linkingObjects', objectType: PLAY_SCHEMA, property: 'udas' },
    sender_id: 'string',
    receiver_id: 'string',
  },
};

export default {
  path: 'iLab.realm',
  schema: [ChampionshipSchema, TeamSchema, PlayerSchema, GameSchema, PlaySchema, UDASchema],
  schemaVersion: 1,
};

export {
  CHAMPIONSHIP_SCHEMA, TEAM_SCHEMA, PLAYER_SCHEMA, GAME_SCHEMA, PLAY_SCHEMA, UDA_SCHEMA,
};
