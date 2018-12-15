docker run --log-opt max-size=500m -d -it -p 7801:7801 --name=tenant_ms tenant_ms npm run staging -- --host=0.0.0.0
