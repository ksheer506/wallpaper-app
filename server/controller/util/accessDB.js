const { open, writeFile } = require('fs/promises');

module.exports = {
  fetchDB: async (path) => {
    let data;

    try {
      const fd = await open(path);
      const rawData = await fd.readFile({ encoding: 'utf-8' });

      data = JSON.parse(rawData);
      fd.close();
    } catch (e) {
      if (e.errno === -2) { // 파일이 없을 때
        data = { comments: [] };
        writeFile(path, JSON.stringify({ comments: [] }), { flag: "a" });
      }
    }

    return data;
  },
  updateDB: (path, updated) => {

  }

}