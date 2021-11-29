<template>
  <div class="container">
    <div id="header" class="row">
      <div id="name" class="col-6">
        Хаб Minecraft
      </div>
      <div id="menu" class="col-6">
        <div class="row">
          <div class="col">
            <router-link class="href-link" to="/">
              <div class="m-button">
                Главная
              </div>
            </router-link>
          </div>
          <div class="col">
            <router-link class="href-link" to="/help">
              <div class="m-button">
                Помощь
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div id="content" class="row">
      <div id="viewer" class="col-12 col-lg-9">
        <router-view/>
      </div>
      <div id="widgets" class="col-12 col-lg-3">
        <div id="servers">
          <h4 id="widgets-head">Мониторинг серверов:</h4>
          <div :id=server.id v-for="server in this.server_list" :key="server.id">
            <p>{{server.name}}: <span v-if="server.server_info.status === true" id="good">Онлайн</span><span v-else id="bad">Выключен</span></p>
            <p v-if="server.server_info.status === true">Онлайн: {{server.server_info.online.current}} / {{server.server_info.online.max}}</p>
            <div v-if="server.server_info.status === true && server.has_map === true" id="map_w">
              <span>Карта: </span>
              <p id="btn" v-on:click="togle_map(server.id)"><span v-if="server.map.map_status === false">ОТКРЫТЬ</span><span v-if="server.map.map_status === true">СКРЫТЬ</span></p>
              <iframe v-show="server.map.map_status === true" style="position: relative;" id="map" width="100%" height="auto" :src=server.map.map_ip />
            </div>
            <div id="player_list" v-if="server.server_info.has_player_list === true">
              <h4 v-if="parseInt(server.server_info.online.current) > 0">Игроки на сервере:</h4>
              <h4 v-if="parseInt(server.server_info.online.current) === 0">Сервер пустует!</h4>
              <p v-for="player in server.server_info.playerlist" :key="player">
                <img class="skin-img" :src="'https://crafatar.com/avatars/'+player.uuid" :id="player.uuid" /> {{player.name}}
                <!-- <span v-if="player.name === 'EzByMesa'">
                  <span style="color: #555555; text-shadow: 2px 2px 0 #151515; font-family: 'MC-Light'; text-decoration: none;">[<span style="color: #AA0000; text-shadow: 2px 2px 0 #2A0000; font-family: 'MC-Light'; text-decoration: none;">+</span>]</span>
                </span>
                <span v-else>
                  <span style="color: #555555; text-shadow: 2px 2px 0 #151515; font-family: 'MC-Light'; text-decoration: none;">[<span style="color: #00AA00; text-shadow: 2px 2px 0 #002A00; font-family: 'MC-Light'; text-decoration: none;">Игрок</span>]</span>
                </span> -->
              </p>
            </div>
            <div id="separator" />
          </div>
        </div>
        <div id="w-status">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'MC-Light';
    src: url('assets/fonts/minecraft.ttf');
  }
  body {
    background-image: url("assets/img/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .container {
    height: 90vh;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0px 10px 21px -5px rgba(234, 140, 33, 0.6);
    background: rgba(0,0,0,0.4);
  }
  #name {
    font-size: 30px;
    font-weight: bolder;
    color: #FFFFFF;
    text-shadow: 3px 3px 0 #3F3F3F, 0 0 0.5em black;
  }
  .skin-img {
    width: 20px;
    height: auto;
  }
  #separator {
    width: 100%;
    border-bottom: 2px dashed rgba(234, 140, 33, 0.6);
    margin-bottom: 10px;
  }
  #menu {
    text-align: right;
  }
  #servers {

  }
  #widgets {
    padding: 10px;
    height: 100%;
    color: #FFFFFF;
    text-shadow: 2px 2px 0 #3F3F3F;
    font-family: 'MC-Light';
    text-decoration: none;
  }
  #widgets-head {
    background-image: url("assets/img/button.jpg");
    margin-right: 10px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
    background-position: center;
    padding: 10px;
    display: inline-block;
    width: 100%;
    color: #FFFFFF;
    text-shadow: 2px 2px 0 #3F3F3F;
    font-family: 'MC-Light';
    text-decoration: none;
    text-align: left;
  }
  #header {
    background-image: url("assets/img/lava.jpg");
    background-repeat: repeat;
    background-size: 100px;
    border-radius: 5px;
    padding: 10px;
    font-family: 'MC-Light';
    color: white;
    border: 2px #32120b solid;
  }

  .router-link-active > .m-button {
    color: #c7c73e;
    text-shadow: 2px 2px 0 #3F3F15;
    filter: brightness(150%);
  }

  .m-button {
    background-image: url("assets/img/button.jpg");
    margin-right: 10px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
    background-position: center;
    padding: 10px;
    display: inline-block;
    width: 100%;
    color: #FFFFFF;
    text-shadow: 2px 2px 0 #3F3F3F;
    font-family: 'MC-Light';
    text-decoration: none;
    text-align: center;
  }

  #good {
    color: #00AA00;
    text-shadow: 2px 2px 0 #002A00;
    font-family: 'MC-Light';
    text-decoration: none;
  }

  #bad {
    color: #AA0000;
    text-shadow: 2px 2px 0 #2A0000;
    font-family: 'MC-Light';
    text-decoration: none;
  }

  #btn {
    background-image: url("assets/img/button.jpg");
    margin-right: 10px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
    background-position: center;
    padding: 10px;
    display: inline-block;
    color: #FFFFFF;
    text-shadow: 2px 2px 0 #3F3F3F;
    width: 100%;
    font-family: 'MC-Light';
    text-decoration: none;
    text-align: center;
  }

  #btn:hover {
    color: #c7c73e;
    text-shadow: 2px 2px 0 #3F3F15;
    filter: brightness(150%);
  }

  p {
    padding-right: 2px;
    padding-left: 5px;
    padding-top: 4px;
    padding-bottom: 2px;
    background: rgba(0,0,0,0.5);
  }
</style>

<script>
export default {
  name: "App",
  mounted() {
    this.get_servers(this.server_list)
    setInterval(() => {
      this.get_servers(this.server_list)
    }, 60000)
  },
  data() {
    return {
      server_list: [
        {
          id: 0,
          tmp: null,
          name: "Mesa's Mine",
          ip: "mc1.ezbymesa.com",
          server_info: {
            motd: null,
            status: false,
            online: {
              current: 0,
              max: 0
            },
            has_player_list: true,
            playerlist: []
          },
          has_map: true,
          map: {
            map_ip: "http://mc1.ezbymesa.com:8123/",
            map_status: false
          }
        }
      ]
    }
  },
  methods: {
    togle_map: function (id) {
      let map = document.getElementById('map')
      let btn = document.getElementById('btn')
      if (this.server_list[id].map.map_status === false) {
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
        this.server_list[id].map.map_status = true

      } else {
        document.body.style.backgroundColor = 'white'
        btn.style.position = 'relative'
        btn.style.bottom = '0'
        map.style.position = 'relative'
        this.server_list[id].map.map_status = false
      }

    },
    get_servers: function (server) {
      for (let i = 0; i < server.length; i++) {
        let current = server[i]

        fetch('https://mcapi.us/server/status?ip='+current.ip, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }).then(response => response.json()).then((result) => {
          if (result.status === 'success') {
            current.server_info.status = true
            current.server_info.online.current = result.players.now
            current.server_info.online.max = result.players.max
            current.server_info.motd = result.motd
            current.tmp = result
            if (current.server_info.has_player_list === true) {
              current.server_info.playerlist = []
              for (let j = 0; j < result.players.sample.length; j++) {
                current.server_info.playerlist.push({
                  name: result.players.sample[j].name,
                  uuid: result.players.sample[j].id
                })
              }
            }
          }
        })
      }
    }
  }
}
</script>
