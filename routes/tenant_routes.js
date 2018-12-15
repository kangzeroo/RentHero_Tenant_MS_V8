const TenantQueries = require('../Postgres/Queries/TenantQueries')

exports.create_tenant = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id
  const first_name = info.first_name
  const last_name = info.last_name
  const phone = info.phone
  const email = info.email

  TenantQueries.insert_tenant(tenant_id, first_name, last_name, phone, email)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('Error in tenant_routes-create_tenant: ', err)
      res.status(500).send(err)
    })
}
