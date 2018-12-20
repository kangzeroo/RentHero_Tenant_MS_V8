const twilio = require('twilio')
const bodyParser = require('body-parser')

// security
const Google_JWT_Check = require('./auth/googleJWTCheck').Google_JWT_Check
const originCheck = require('./auth/originCheck').originCheck

// routes
const Test = require('./routes/test_routes')
const TenantRoutes = require('./routes/tenant_routes')
const TenantRegistrationRoutes = require('./routes/tenant_registration_routes')
const PhoneRoutes = require('./routes/phone_routes')

// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})
// bodyParser attempts to parse any request into GraphQL format
// const graphql_encoding = bodyParser.text({ type: 'application/graphql' })

module.exports = function(app){

	app.use(bodyParser())

	// tests
	app.get('/test', json_encoding, Test.test)
	// app.get('/auth_test', [json_encoding, originCheck, Google_JWT_Check], Test.auth_test)

	// Phone Routes
	app.post('/verify_phone', [json_encoding], PhoneRoutes.verify_phone)

	// Tenant Registration Routes
	app.post('/register_tenant_phone', [json_encoding], TenantRegistrationRoutes.register_tenant_phone)
	app.post('/register_tenant_email', [json_encoding], TenantRegistrationRoutes.register_tenant_email)
	app.post('/update_tenant_name', [json_encoding], TenantRegistrationRoutes.update_tenant_name)

	// Tenant Routes
	app.post('/create_tenant', [json_encoding], TenantRoutes.create_tenant)
	app.post('/get_tenant', [json_encoding], TenantRoutes.get_tenant)
	app.post('/insert_tenant_favorite', [json_encoding], TenantRoutes.insert_tenant_favorite)
	app.post('/get_favorites_for_tenant', [json_encoding], TenantRoutes.get_favorites_for_tenant)
	app.post('/remove_tenant_favorite', [json_encoding], TenantRoutes.remove_tenant_favorite)

	// RentHero Phone Routes
	// app.post('/receive_sms_on_renthero_number', [twilio.webhook({ validate: false })], SMSRoutes.receive_sms_on_renthero_number)
	// app.post('/send_sms_from_proxy_phone', [json_encoding, originCheck, Google_JWT_Check], SMSRoutes.send_sms_from_proxy_phone)
}
