/**
 * DmcLib
 *
 * example)
options = {
  acl: {
    allow_origin: 'https://cam-inc.github.io',
    allow_headers: 'X-Requested-With, Origin, Content-Type, Accept, Authorization, X-Pagination-Limit, X-Pagination-Total-Pages, X-Pagination-Current-Page',
    expose_headers: 'X-Requested-With, Origin, Content-Type, Accept, Authorization, X-Pagination-Limit, X-Pagination-Total-Pages, X-Pagination-Current-Page',
  },
  audit_log: {
    AuditLogs: {{Sequelize.Model}}
  },
  admin_user: {
    AdminUsers: {{Sequelize.Model}},
    default_role: 'viewer',
  },
  admin_role: {
    AdminRoles: {{Sequelize.Model}},
    store: {{Sequelize}},
    default_role: 'viewer',
  },
  auth: {
    AdminUsers: {{Sequelize.Model}},
    AdminRoles: {{Sequelize.Model}},
    super_role: 'super',
    auth_jwt: {
      algorithm: 'RS512',
      claims: {
        iss: 'issuer',
        aud: 'audience',
      },
      rsa_private_key: '',
      rsa_public_key: '',
    },
    google_oauth: {
      client_id: '99999999999-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com',
      client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      redirect_url: 'https://localhost:3000/googleoauth2callback',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      allow_email_domains: [
        'your.organization.com',
      ],
    },
  },
};
*/
class DmcLib {
  constructor(options) {
    this.acl = require('./acl')(options.acl || {});
    this.adminRole = require('./admin_role')(options.admin_role || {});
    this.adminUser = require('./admin_user')(options.admin_user || {});
    this.auditLog = require('./audit_log')(options.audit_log || {});
    this.auth = require('./auth')(options.auth || {});
    this.constants = require('./constants');
    this.errorHandler = require('./error_handler');
    this.errors = require('./errors');
    this.pager = require('./pager');
    this.stores = require('./stores');
    this.swagger = require('./swagger')();
  }
}

module.exports = DmcLib;
