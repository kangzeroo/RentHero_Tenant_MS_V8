const Promise = require('bluebird')
const { promisify } = Promise
const pool = require('../db_connect')
const uuid = require('uuid')
const moment = require('moment')

// to run a query we just pass it to the pool
// after we're done nothing has to be taken care of
// we don't have to return any client to the pool or close a connection

const query = promisify(pool.query)


exports.insert_tenant = (tenant_id, first_name, last_name, email, phone, authenticated) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id, first_name, last_name, email, phone, authenticated]
    const queryString = `INSERT INTO tenants (tenant_id, first_name, last_name, email, phone_number, authenticated)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            ON CONFLICT (tenant_id)
                            DO UPDATE SET first_name = $2,
                                          last_name = $3,
                                          email = $4,
                                          phone_number = $5,
                                          authenticated = $6,
                                          updated_at = CURRENT_TIMESTAMP
                            RETURNING tenant_id
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-insert_tenant: ', err)
        rej('An Error Occurred')
      }
      if (results && results.rowCount > 0) {
        console.log('Successfully created tenant')
        res({
          message: 'Saved',
          tenant_id: results.rows[0].tenant_id
        })
      } else {
        console.log('Existing tenant account')
        res({
          message: 'Existing Tenant Account',
          tenant_id: results.rows[0].tenant_id
        })
      }
    })

  })
  return p
}

exports.register_tenant_phone = (tenant_id, phone_number, national_format, country_code, email, authenticated) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id, phone_number, national_format, country_code, email, authenticated]
    const queryString = `INSERT INTO tenants (tenant_id, phone_number, national_format, country_code, email, authenticated)
                              VALUES ($1, $2, $3, $4, $5, $6)
                              ON CONFLICT (phone_number)
                              DO UPDATE SET last_login = CURRENT_TIMESTAMP
                         RETURNING *
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-insert_tenant_phone: ', err)
        rej('An Error Occurred')
      }
      console.log(results)

      if (results && results.rowCount === 0) {
        // already exists
        res({
          message: 'An account with this phone number already exists',
          account_exists: true,
        })
      }
      res({
        message: 'Successful Registration',
        account_exists: false,
        tenant: results.rows[0]
      })
    })
  })
  return p
}

exports.register_tenant_email = (tenant_id, email, authenticated) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id, email, authenticated]
    const queryString = `INSERT INTO tenants (tenant_id, email, authenticated)
                              VALUES ($1, $2, $3)
                              ON CONFLICT (email)
                              DO UPDATE SET last_login = CURRENT_TIMESTAMP
                          RETURNING *
                        `
    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-insert_tenant_email: ', err)
        rej('An Error Occurred')
      }
      console.log(results)

      if (results && results.rowCount === 0) {
        // already exists
        res({
          message: 'An account with this email address already exists',
          account_exists: true,
        })
      }
      res({
        message: 'Successful Registration',
        account_exists: false,
        tenant: results.rows[0]
      })
    })

  })
  return p
}

exports.upsert_tenant_name = (tenant_id, first_name, authenticated) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id, first_name, authenticated]
    const queryString = `INSERT INTO tenants (tenant_id, first_name, authenticated)
                              VALUES ($1, $2, $3)
                            ON CONFLICT (tenant_id)
                            DO UPDATE SET first_name = $2,
                                          authenticated = $3,
                                          updated_at = CURRENT_TIMESTAMP
                          RETURNING *
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-upsert_tenant_name: ', err)
        rej('Failed to update')
      }
      if (results && results.rowCount > 0) {
        res({
          message: 'Successfully updated',
          tenant: results.rows[0]
        })
      } else {
        console.log('ERROR: ', results)
        res({
          message: 'Name updated'
        })
      }

    })
  })
  return p
}

exports.get_tenant = (tenant_id) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id]
    const queryString = `SELECT * FROM tenants
                          WHERE tenant_id = $1
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-get_tenant: ', err)
        rej(err)
      }
      if (results && results.rowCount > 0) {
        res(results.rows[0])
      } else {
        rej('Account does not exist')
      }
    })
  })
  return p
}

exports.insert_tenant_favorite = (tenant_id, property_id, meta) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id, property_id, meta]
    const queryString = `INSERT INTO tenant_favorites (tenant_id, property_id, meta)
                              VALUES ($1, $2, $3)
                              ON CONFLICT (tenant_id, property_id)
                              DO UPDATE SET meta = $3,
                                            updated_at = CURRENT_TIMESTAMP
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-insert_tenant_favorites: ', err)
        rej(err)
      }
      res({
        message: 'Saved to list'
      })
    })
  })
  return p
}

exports.get_favorites_for_tenant = (tenant_id) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id]
    console.log(values)
    const queryString = `SELECT *
                           FROM tenant_favorites
                          WHERE tenant_id = $1
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-get_favorites_for_tenant: ', err)
        rej(err)
      }
      console.log(results.rows)
      if (results && results.rowCount > 0) {
        res(results.rows)
      } else {
        res([])
      }
    })
  })
  return p
}

exports.remove_favorite_for_tenant = (tenant_id, property_id) => {
  const p = new Promise((res, rej) => {
    const values = [tenant_id, property_id]
    const queryString = `DELETE FROM tenant_favorites
                               WHERE tenant_id = $1
                                 AND property_id = $2
                        `

    query(queryString, values, (err, results) => {
      if (err) {
        console.log('ERROR IN TenantQueries-remove_tenant_favorite: ', err)
        rej(err)
      }
      res({
        message: 'Removed Favorite'
      })
    })
  })
  return p
}
