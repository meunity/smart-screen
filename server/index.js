const Koa = require('koa')
const consola = require('consola')
const router = require('koa-router')()
const { Nuxt, Builder } = require('nuxt')
const sha1 = require('crypto-js/sha1')
const koaJwt = require('koa-jwt')
const jsonWebToken = require('jsonwebtoken')

const app = new Koa()
const secret = 'SIMPLE-TOKEN'
const img = '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'

const istokenExpired = function (token) {
  return !jsonWebToken.verify(token.split(' ')[1], secret)
}

router.get('/auth/signin', (ctx, next) => {
  if (!ctx.query.name || ctx.query.name !== 'admin') {
    ctx.status = 204
    ctx.body = [{
      msgkey: 'no_user',
      msgref: 'Can not find this user.'
    }]
    return
  }
  if (!ctx.query.pwd || ctx.query.pwd !== sha1('123456').toString()) {
    ctx.status = 400
    return
  }
  ctx.body = {
    accessToken: jsonWebToken.sign({ user: 'admin', id: 399922 }, secret, { expiresIn: 60 * 5 }),
    'userId': 399922,
    'userName': 'admin_hevision',
    'trueName': '禾视',
    'roleName': '管理员',
    'authLocation': 1,
    'authMfa': '{"mod_status_monitor":{"fun_net_status":["act_view"],"fun_power_status":["act_view"]},"mod_status_warning":{"fun_net_status":[]}}' // mod_模块， fun_功能， act_操作
  }
})
router.get('/auth/iamliving', (ctx, next) => {
  const token = ctx.headers.authorization
  if (istokenExpired(token)) {
    ctx.status = 401
    return
  }
  ctx.body = [{
    msgkey: 'report_success',
    msgref: 'Report successfully.'
  }]
})

router.get('/analysis/event/subscribe', (ctx, next) => {
  const auth = ctx.headers.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return next()
  }
  const arr = []
  for (let i = 0; i < Math.ceil(Math.random() * 100); i++) {
    arr.push({
      'eventId': i + 1,
      'locationId': Math.ceil(Math.random() * 5),
      'cameraId': 1,
      'triggerModel': '人员聚集',
      'recordStart': Date.now(),
      'snapshot': img,
      'reactGuideline': '派遣驱散...'
    })
  }
  ctx.body = arr
})
router.get('/analysis/event/:id', (ctx, next) => {
  const auth = ctx.headers.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return next()
  }
  ctx.body = {
    'eventId': parseInt(ctx.params.id),
    'locationId': 1,
    'cameraId': 1,
    'triggerModel': '人员聚集',
    'recordStart': 1567267200000,
    'recordFinish': 1667293200000,
    'recordStreamUri': '录像播放地址',
    'snapshot': img,
    'reactStart': 1567267200000,
    'reactFinish': 1667293200000,
    'reactGuideline': '派遣驱散...',
    'reactInspect': '已驱散'
  }
})
router.get('/location/all', (ctx, next) => {
  const auth = ctx.headers.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return next()
  }
  ctx.body = [
    {
      'locationId': 0,
      'parentId': 0,
      'isLeaf': false,
      'nodeText': 'XX公司',
      'mapFile': ''
    },
    {
      'locationId': 1,
      'parentId': 0,
      'isLeaf': false,
      'nodeText': '1号楼',
      'mapFile': ''
    },
    {
      'locationId': 2,
      'parentId': 0,
      'isLeaf': false,
      'nodeText': '2号楼',
      'mapFile': ''
    },
    {
      'locationId': 3,
      'parentId': 1,
      'isLeaf': false,
      'nodeText': '一楼',
      'mapFile': ''
    },
    {
      'locationId': 4,
      'parentId': 3,
      'isLeaf': true,
      'nodeText': '101室',
      'mapFile': ''
    }
  ]
})
router.get('/analysis/camera', (ctx, next) => {
  const auth = ctx.headers.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return next()
  }
  ctx.body = [
    {
      'cameraId': 1,
      'protocol': 'rtsp',
      'profile': '{"url","rtsp://example.com/onvif_camera/video"}',
      'userName': 'admin',
      'password': '123456'
    },
    {
      'cameraId': 3,
      'protocol': 'onvif',
      'profile': '{"ip":"172.16.2.123"}',
      'userName': 'admin',
      'password': '123456'
    }
  ]
})

router.put('/analysis/event/:id/start-react', (ctx, next) => {
  const auth = ctx.headers.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return next()
  }
  ctx.body = {
    'msgkey': 'react_started',
    'msgref': 'React started.'
  }
})

router.put('/analysis/event/:id/finish-react', (ctx, next) => {
  const auth = ctx.headers.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return next()
  }
  ctx.body = {
    'msgkey': 'react_finished',
    'msgref': 'React finished.'
  }
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  app.use(async (ctx, next) => {
    await next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = 'token无效'
      } else {
        throw err
      }
    })
  })
  app.use(koaJwt({
    secret: 'SMART_SCREEN'
  }).unless({
    path: [/^\/auth\/siginin/
    ]
  }))

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
