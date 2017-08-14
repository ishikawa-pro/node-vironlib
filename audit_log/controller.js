/**
 * Controller : List Audit Log
 * HTTP Method : GET
 * PATH : /auditlog
 *
 * @param {Object} options
 * @param {Sequelize.model} options.AuditLogs
 * @param {Object} pager
 * @returns {function(*, *, *)}
 */
const registerList = (options, pager) => {
  const AuditLogs = options.AuditLogs;

  return (req, res) => {
    const attributes = Object.keys(req.swagger.operation.responses['200'].schema.items.properties);
    const limit = Number(req.query.limit || pager.defaultLimit);
    const offset = Number(req.query.offset || 0);
    return Promise.resolve()
      .then(() => {
        return AuditLogs.count();
      })
      .then(count => {
        pager.setResHeader(res, limit, offset, count);
        const options = {
          attributes,
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        };
        return AuditLogs.findAll(options);
      })
      .then(list => {
        res.json(list);
      })
    ;
  };
};

module.exports = (options, pager) => {
  return {
    list: registerList(options, pager),
  };
};
