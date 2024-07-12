<template>
  <div
    id="login_container"
    @keyup.13="loginIn()"
  >
    <div id="login_head_wrap">
      <div id="login_head">
        <!-- <img src="../assets/dashboard/logo.png" alt=""> -->
        <!-- <span class="login_lan" @click="changeLangEvent">{{ $trans('language') }}</span> -->
      </div>
    </div>
    <div id="login_content_wrap">
      <div class="login_pic" />
      <div id="login_content">
        <h2 class="login_title">数据合并平台
        </h2>
        <form action="">
          <fieldset>
            <section>
              <div class="login_info">
                <p class="login_input_p">{{ $trans('username') }}</p>
                <label class="input login_input">
                  <el-input
                    id="username"
                    v-model="username"
                    name="username"
                    class="login_border"
                    :placeholder="$trans('validate.username')"
                    clearable
                  />
                </label>
              </div>
            </section>
            <section>
              <div class="login_info">
                <p class="login_input_p">{{ $trans('password') }}</p>
                <label class="input login_input">
                  <el-input
                    v-model="password"
                    type="password"
                    class="login_border"
                    name="password"
                    clearable
                    :placeholder="$trans('validate.password')"
                  />
                </label>
              </div>
            </section>
            <div class="login_tip">
              <span style="color: #e21532;font-size: 12px">{{ msg }}</span>
            </div>
          </fieldset>
          <button
            v-loading="loading"
            type="button"
            class="btn btn_lightblue btn-login"
            @click="loginIn()"
          >
            {{ $trans('login') }}
          </button>

        </form>
      </div>
    </div>

    <!-- <p id="login_foot_wrap" class="page-footer">
      {{ getTime }}
    </p> -->
  </div>
</template>

<script>
import { login } from '../api';
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      arr: '',
      loading: false,
      username: 'superAdmin',
      password: 'superAdmin123!',
      msg: '',
      lang: sessionStorage.getItem('lang') || 'zh-CN',
      yearTime: ''
    }
  },
  computed: {
    ...mapState(['user', 'port', 'api']),
    getTime () {
      const date = new Date()
      return `${date.getFullYear()}` + ' © ' + 'PengYun Network'
    }
  },
  mounted () {

    // document.querySelector('#username').focus()
    // this.username = JSON.parse(localStorage.getItem('user')).name
  },
  destroy () {
  },

  methods: {
    changeLangEvent () {
      this.lang = this.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
      this.$i18n.locale = this.lang
      sessionStorage.setItem('lang', this.lang)
    },
    loginIn () {
      login({
        userName: this.username,
        password: this.password
      }).then(res=>{
        setTimeout(() => {
        const userInfo  = {
          userName:'superAdmin'
        }
        this.$store.state.userData = userInfo
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        this.$router.push('/about')
      }, 200);
        console.log(res,'123')
      })
      return
      if (!this.username) {
        this.msg = this.$trans('user.name.tool.tip')
        setTimeout(function () {
          this.msg = ''
        }, 3000)
        return
      } else if (!this.password) {
        this.msg = this.$trans('password.tool.tip')
        setTimeout(function () {
          this.msg = ''
        }, 3000)
        return
      }
      this.loading = true
      login({
        userName: this.username,
        password: this.password
      })
        .then(res => {
          if (res.code == '200') {
            const user = {
              name: this.username,
              eman: this.password
            }
            // refreshToken
            // 有accessToken和refreshToken
            //
            // 登录验证成功、保存用户信息、权限在其中、渲染显示菜单
            this.$store.commit('SET_TOKEN', res.data.accessToken)
            this.$store.commit('SET_EXPIRE_TOKEN', res.data.refreshToken)
            this.$store.dispatch('login', user).then((r) => {
              // 确保getEndPoint执行创建s3jdk成功、getPermisson 渲染权限菜单成功
              this.$msg({
                type: 'success',
                text: '登录成功',
                duration: 1000
              })
              this.loading = false
              delete window.firstJumpTo
              this.$router.push({ name: 'Glacier' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$msg({
              type: 'error',
              text: this.$trans(res.msg)
            })
            this.msg = this.$trans(res.msg)
            this.loading = false
            setTimeout(function () {
              this.msg = ''
            }, 3000)
          }
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login_container {
  height: 100vh;
  min-height: 780px;
  background: url("../assets/login/login_bg.png") no-repeat;
  background-size: 100% 100%;
}

#login_head_wrap {
  height: 60px;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
}

#login_head {
  height: 60px;
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

#login_head img {
  margin-top: 15px;
}

#login_content_wrap {
  width: 1080px;
  height: 550px;
  border: 5px solid rgba(256, 256, 256, 0.08);
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -545px;
  margin-top: -280px;
}

#login_content {
  float: right;
  width: 480px;
  height: 100%;
  border-radius: 0px 4px 4px 0px;
}

#login_content section {
  margin: 50px auto 5px;
}

#login_content fieldset {
  display: block;
  padding: 0px 14px 5px;
  border: none;
  position: relative;
  margin: 0;
}

.login_pic {
  float: left;
  width: 600px;
  height: 100%;
  background: url("../assets/login/left_pic.png") no-repeat;
}

#login_foot_wrap {
  position: fixed;
  padding: 0;
  margin: 0;
  border: none;
  color: #fff;
  font-size: 12px;
  text-align: center;
  height: 36px;
  line-height: 36px;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  bottom: 0;
}

.login_title {
  font-weight: normal;
  color: #d3d6d8;
  letter-spacing: 0.03em;
  text-align: center;
  margin: 125px auto 0;
  font-size: 22px;
}

.login_input_p {
  width: 50px;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  text-align: right;
  color: #d3d6d8;
}

.login_input {
  width: 290px;
  display: inline-block !important;
  margin-left: 20px;
  height: 35px;
  line-height: 35px;
}

.login_info {
  margin: 0 auto;
  width: 370px;
}

.login_info > .input > input {
  border: none !important;
  border-bottom: 1px solid #efefef !important;
  font-size: 12px;
  color: #d3d6d8;
  padding: 5px 30px 5px 0;
}

.login_tip {
  height: 20px;
  width: 100%;
  margin-bottom: 40px;
  padding-left: 114px;
}

.btn-login {
  display: block;
  width: 288px;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  margin: 0 128px;
  border-radius: 2px;
  cursor: pointer;
}

.login_border:-webkit-autofill,
.login_border:-webkit-autofill:focus,
.login_border:-webkit-autofill:hover {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: #d3d6d8;
}

.login_lan {
  color: #fff;
  float: right;
  line-height: 60px;
  cursor: pointer;
}
</style>
