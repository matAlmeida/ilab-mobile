const uda2matrix = (plays, players) => {
  // const idMap = players.map((player, index) => ({ id: player.id, index }));
  // const matrix = [];

  // for (let i = 0; i < 11; i += 1) {
  //   const row = [];

  //   for (let j = 0; j < 11; j += 1) {
  //     const column = 0;
  //     row.push(column);
  //   }

  //   matrix.push(row);
  // }

  // plays.map(play => Object.keys(play.udas)
  //   .map(key => play.udas[key])
  //   .map((uda) => {
  //     const sender = idMap.find(mapped => mapped.id === uda.senderId);
  //     const receiver = idMap.find(mapped => mapped.id === uda.receiverId);

  //     matrix[sender.index][receiver.index] += 1;
  //   }));

  // return matrix;

  const ret = { plays, players };

  return JSON.stringify(ret);
};

const matrix2csv = (matrix) => {
  // const csv = matrix.reduce((str1, row) => {
  //   const col = row.reduce((str2, column) => `${str2},${column}`, '');

  //   return `${str1}${col.substring(1)}\n`;
  // }, '');

  // return csv;
  const csv = matrix;

  return csv;
};

export { uda2matrix, matrix2csv };
