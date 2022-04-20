import {register, collectDefaultMetrics} from "prom-client"

collectDefaultMetrics({prefix: 'nextjs_mongodb_'})

export default async (req, res) => {
    res.setHeader('Content-type', register.contentType)
    res.send(await register.metrics())
}