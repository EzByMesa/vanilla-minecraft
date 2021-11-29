<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-9">
        <div id="nav" style="background-color: darkcyan; padding: 2px; border-radius: 5px 5px 0 0; text-align: center;">
          <router-link class="href-link" to="/">Главная</router-link> |
          <router-link class="href-link" to="/help">Помощь</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-9">
        <router-view/>
      </div>
      <div class="col-12 col-lg-3" style="background: rgba(255,255,255,0.9); border-radius: 5px">
        <div class="row" id="online" v-if="uptime === 'success'" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .2);">
          <div class="col-6">
            <p>Онлайн: {{online.current}}</p>
          </div>
          <div class="col-6">
            <p>Всего: {{online.max}}</p>
          </div>
          <div class="col-12">
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="'width:'+this.online.current/this.online.max*100+'%'" :aria-valuenow=this.online.current aria-valuemin="0" :aria-valuemax=this.online.max></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p style="opacity: 0.7">Режим сервера: <span v-if="status === true" style="color: green">Лицензия</span><span v-else style="color: firebrick">Пиратский</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h4 style="border-top: dashed darkcyan 2px; padding: 5px; text-align: center">Игроки в игре:</h4>
            <p v-for="player in online_players" :key="player.name">
              {{player.name}}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h4 style="border-top: dashed darkcyan 2px; padding: 5px; text-align: center">Карта</h4>
            <p id="btn" v-on:click="togle_map"><span v-if="map_status === false">ОТКРЫТЬ</span><span v-if="map_status === true">СКРЫТЬ</span></p>
            <iframe v-show="map_status === true" style="position: relative;" id="map" width="100%" height="auto" src="http://mc1.ezbymesa.com:8123/" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#btn {
  padding: 5px;
  color: white;
  background-color: darkcyan;
  border-radius: 5px;
  text-align: center;
  transition: 0.5s;
}

#btn:hover {
  color: white;
  background-color: #87bfbf;
}
#online {
  padding: 5px;
  background-color: darkcyan;
  color: aliceblue;
  text-align: center;
  border-radius: 5px;
}
.href-link {
  color: white;
  text-decoration: none;
  font-weight: bolder;
  transition: 0.2s;
}
.href-link:hover {
  color: #822323;
}

</style>

<script>
export default {
  methods: {
    togle_map: function () {
      let map = document.getElementById('map')
      let btn = document.getElementById('btn')
       if (this.map_status === false) {
         document.body.style.backgroundColor = 'black'
         btn.style.position = 'fixed'
         btn.style.left = 'calc(50% - 100px)'
         btn.style.bottom = '10px'
         btn.style.width = '200px'
         btn.style.height = 'auto'
         btn.style.zIndex = '100'
         map.style.position = 'fixed'
         map.style.left = '0'
         map.style.top = '0'
         map.style.height = '100%'
         map.style.zIndex = '1'
         this.map_status = true

       } else {
         document.body.style.backgroundColor = 'white'
         btn.style.position = 'relative'
         btn.style.bottom = '0'
         map.style.position = 'relative'
         this.map_status = false
       }

    }
  },
  mounted() {
    fetch('https://mcapi.us/server/status?ip=mc1.ezbymesa.com', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => response.json()).then((result) => {
      this.result = result
      this.uptime = result.status
      this.online.current = result.players.now
      this.online.max = result.players.max
      this.status = result.online

      for (let i = 0; i < result.players.sample.length; i++) {
        this.online_players.push({
          name: result.players.sample[i].name
        })
        console.log('OK')
      }
    })
  },
  data() {
    return {
      map_status: false,
      result: null,
      status: null,
      uptime: null,
      online: {
        current: 0,
        max: 0
      },
      online_players: []
    }
  }
}

</script>
