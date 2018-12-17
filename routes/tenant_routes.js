const TenantQueries = require('../Postgres/Queries/TenantQueries')

exports.create_tenant = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id
  const first_name = info.first_name
  const last_name = info.last_name
  const phone = info.phone
  const email = info.email
  const authenticated = info.authenticated

  TenantQueries.insert_tenant(tenant_id, first_name, last_name, phone, email, authenticated)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('Error in tenant_routes-create_tenant: ', err)
      res.status(500).send(err)
    })
}

exports.get_tenant = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id

  TenantQueries.get_tenant(tenant_id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('ERROR IN tenant_routes-get_tenant: ', err)
      res.status(500).send(err)
    })
}

exports.insert_tenant_favorite = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id
  const property_id = info.property_id
  const meta = info.meta

  TenantQueries.insert_tenant_favorite(tenant_id, property_id, meta)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('ERROR IN tenant_routes-insert_tenant_favorite: ', err)
      res.status(500).send(err)
    })

}

exports.get_favorites_for_tenant = (req, res, next) => {
  const info = req.body
  console.log(info)

  TenantQueries.get_favorites_for_tenant(info.tenant_id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('ERROR IN TenantQueries-get_favorites_for_tenant: ', err)
      res.status(500).send(err)
    })
}
