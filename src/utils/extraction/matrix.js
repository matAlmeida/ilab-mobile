/* eslint-disable */

const getPlayersInField = ({ udas }, players) => {
  const inGamePlayers = [];
  Object.keys(udas).map(udaId => {
    const { senderId, receiverId } = udas[udaId];
    if (
      inGamePlayers.findIndex(({ id: playerId }) => playerId === senderId) < 0
    ) {
      inGamePlayers.push({ id: senderId });
    }
    if (
      inGamePlayers.findIndex(({ id: playerId }) => playerId === receiverId) < 0
    ) {
      inGamePlayers.push({ id: receiverId });
    }
  });

  const playersInField = players.filter(
    ({ id: playerId }) => players.findIndex(({ id }) => id === playerId) >= 0
  );

  return playersInField;
};

const uda2matrix = (plays, players) => {
  const playerInField = getPlayersInField(plays, players);

  const idMap = playerInField.map((player, index) => ({
    id: player.id,
    index
  }));
  const matrix = [];

  for (let i = 0; i < 11; i += 1) {
    const row = [];

    for (let j = 0; j < 11; j += 1) {
      const column = 0;
      row.push(column);
    }

    matrix.push(row);
  }

  plays.map(play =>
    Object.keys(play.udas)
      .map(key => play.udas[key])
      .map(uda => {
        const sender = idMap.find(mapped => mapped.id === uda.senderId);
        const receiver = idMap.find(mapped => mapped.id === uda.receiverId);

        matrix[sender.index][receiver.index] += 1;
      })
  );

  return matrix;
};

const matrix2csv = matrix => {
  const csv = matrix.reduce((str1, row) => {
    const col = row.reduce((str2, column) => `${str2},${column}`, "");

    return `${str1}${col.substring(1)}\n`;
  }, "");

  return csv;
};

export { uda2matrix, matrix2csv };
