const adminRoleHelper = require('../admin_role/helper');
const contains = require('mout/array/contains');

/**
 * Get swagger host port
 * @param swaggerExpress
 */
const getPort = (swaggerExpress, defaultValue) => {
  const host = swaggerExpress.runner.swagger.host || '';
  if (2 <= host.split(':').length && !!parseInt(host.split(':')[1])) {
    return parseInt(host.split(':')[1]);
  }
  return defaultValue;
};

/**
 * AdminRole create/update 用のenum配列を自動生成する
 * @param swaggerExpress
 * @returns {Promise.<TResult>}
 */
const genAdminRolePaths = swaggerExpress => {
  return new Promise(resolve => {
    const paths = swaggerExpress.runner.swagger.paths;
    const enums = new Set();
    for (let path in paths) {
      for (let method in paths[path]) {
        const resource = path.split('/')[1];
        // ワイルドカード
        enums.add(`${method.toUpperCase()}:/*`);
        // ホワイトリストに入っているリソースは無視
        if (resource && !contains(adminRoleHelper.whiteList, resource)) {
          enums.add(`${method.toUpperCase()}:/${resource}`);
        }
      }
    }
    const def = swaggerExpress.runner.swagger.definitions.adminrolepath;
    def.properties.path.enum = Array.from(enums);
    resolve();
  });
};

/**
 * Auto Generate swagger.json
 * @param swaggerExpress
 */
const autoGenerate = swaggerExpress => {
  return Promise.all([
    genAdminRolePaths(swaggerExpress),
  ]);
};

module.exports = {
  getPort,
  autoGenerate,
};
