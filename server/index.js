const Koa = require('koa')
const consola = require('consola')
const router = require('koa-router')()
const { Nuxt, Builder } = require('nuxt')
const sha1 = require('crypto-js/sha1')

const app = new Koa()
const istokenExpired = function (token) {
  const accessToken = 'SIMPLE-TOKEN da39a3ee5e6b4b0d3255bfef95601890afd80709'
  return token !== accessToken
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
    accessToken: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    'userId': 399922,
    'userName': 'admin_hevision',
    'trueName': '禾视',
    'roleName': '管理员',
    'authLocation': 1,
    'authMfa': '{"mod_status_monitor":{"fun_net_status":["act_view"],"fun_power_status":["act_view"]},"mod_status_warning":{"fun_net_status":[]}}' // mod_模块， fun_功能， act_操作
  }
})
router.get('/auth/iamliving', (ctx, next) => {
  if (!ctx.header.authorization || ctx.header.authorization !== 'SIMPLE-TOKEN da39a3ee5e6b4b0d3255bfef95601890afd80709') {
    ctx.status = 401
    return
  }
  ctx.body = [{
    msgkey: 'report_success',
    msgref: 'Report successfully.'
  }]
})

router.get('/analysis/event/subscribe', (ctx, next) => {
  const auth = ctx.header.authorization
  if (istokenExpired(auth)) {
    ctx.status = 401
    return
  }
  ctx.body = [
    {
      'eventId': 10,
      'locationId': 1,
      'cameraId': 1,
      'triggerModel': '人员聚集',
      'recordStart': 1567267200000,
      'snapshot': '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgFBgcGBQgHBgcJCAgJDBMMDAsLDBgREg4THBgdHRsYGxofIywlHyEqIRobJjQnKi4vMTIxHiU2OjYwOiwwMTD/2wBDAQgJCQwKDBcMDBcwIBsgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD/wAARCAJdA2sDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiig....',
      'reactGuideline': '派遣驱散...'
    },
    {
      'eventId': 11,
      'locationId': 2,
      'cameraId': 2,
      'triggerModel': '人员跌倒',
      'recordStart': 1567268200000,
      'snapshot': '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAJEAlEDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAAECAwQFBgf/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/2gAMAwEAAhADEAAAAfVAAAAKRdMzTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFGAxVTNBrcsjj+tq8vp22y4eefYCS9fFMtC10xKQT6AAAAAQczqcJje51XlnriyxyQa58/b5C7W+nPyRvTcfs2blCJi7vKdF5z5vd1fT+a9Zw3tXeM6Dv5ItfndH1cGFIl6MAAAAAAAAAAAAAAAAAAAAAAAjkjJADJL7Oe+X17bemKW/m6SN5TrOM8np6R/KQcu3eYu273+FjwoAAAbSnZHK8n0/JcfU/1Dy3s07Mo3u3mDNdWgZVkuFJC8Z05ZziCWzbgoRemzks0p6zKtFB5eIIC8UZycAAAAAAAAAAAAAAAAAAABFCIlCIlCIlCIlCJ7iAAAKAAAAAbj7TMsDG7YmuC6HbkyQedM5kt4qm60GdNbDJsXgxV2Qo5vQBiM3gzINoMdNkM+HWDJuWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOSKMyvo0+fZ8dlLK8liKo5p1Zoy2miWoJ7nm69pmoyrv1ytJftJh9HgdEYFbZqrA6Vxk9DQtSaOXqUFh5vueeHb/ObVmVmdHkSqzYq2Yt6WCVWWbKVZ3SD6W1kLo0pHWGLpRrAtlYzXaLazb0Vwq5vRZcUpLetWXnbLR2zn6AAAAAA.....',
      'reactGuideline': '呼叫120...'
    }
  ]
})
router.get('/analysis/event/:id', (ctx, next) => {
  ctx.body = {
    'eventId': 10,
    'locationId': 1,
    'cameraId': 1,
    'triggerModel': '人员聚集',
    'recordStart': 1567267200000,
    'recordFinish': 1667293200000,
    'recordStreamUri': '录像播放地址',
    'snapshot': '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgFBgcGBQgHBgcJCAgJDBMMDAsLDBgREg4THBgdHRsYGxofIywlHyEqIRobJjQnKi4vMTIxHiU2OjYwOiwwMTD/2wBDAQgJCQwKDBcMDBcwIBsgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD/wAARCAJdA2sDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiig....',
    'reactStart': 1567267200000,
    'reactFinish': 1667293200000,
    'reactGuideline': '派遣驱散...',
    'reactInspect': '已驱散'
  }
})
router.get('/location/all', (ctx, next) => {
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

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
