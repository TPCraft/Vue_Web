<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>游戏登入</v-card-title>
        <v-card-subtitle>登入请求列表</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col md="12" v-if="Data === null">
              <p class="text-center">暂无登入请求</p>
            </v-col>
            <v-col
                v-for="(Data, I) in Data"
                :key="I"
                md="4">
              <v-card>
                <v-card-title>#{{ Data.Id }}</v-card-title>
                <v-card-subtitle>{{ Data.Game }} - #{{ Data.Server }}</v-card-subtitle>
                <v-card-text>
                  请在 <span class="error--text">{{ (Date.parse(new Date(Data.ExpiredDate)) - Date.parse(new Date())) / 1000 }}</span> 秒内完成登入
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      @click="Cancel(Data.Id)"
                      :disabled="Disabled_Cancel"
                      :loading="Disabled_Cancel"
                      color="warning">
                    <v-icon>mdi-cancel</v-icon>
                    <span class="ml-2">取消</span>
                  </v-btn>
                  <v-btn
                      @click="Login(Data.Id)"
                      :disabled="Disabled_Login"
                      :loading="Disabled_Login"
                      color="success" >
                    <v-icon>mdi-login</v-icon>
                    <span class="ml-2">登入</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Login",

  data: () => ({
    Data: null,
    Disabled_Login: false,
    Disabled_Cancel: false,
    Page: 1
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/Login")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 登入列表 */
    setInterval(this.LoginList, 1000)
  },

  methods: {
    /* 登入列表 */
    LoginList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Game/List", {Page: this.Page})
          .then(Response => (
              this.CallBack_LoginList(Response.data)
          ))
    },
    /* 登入列表回调 */
    CallBack_LoginList(Data) {
      this.Data = Data.Data
    },
    /* 登入 */
    Login(Id) {
      this.Disabled_Login = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Game/Login", {Id: Id})
          .then(Response => (
              this.CallBack_Login(Response.data)
          ))
    },
    /* 登入回调 */
    CallBack_Login(Data) {
      if (Data.Code === 4002) {
        this.Disabled_Login = false
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    },
    /* 取消登入 */
    Cancel(Id) {
      this.Disabled_Cancel = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Game/Cancel", {Id: Id})
          .then(Response => (
              this.CallBack_Cancel(Response.data)
          ))
    },
    /* 登入回调 */
    CallBack_Cancel(Data) {
      if (Data.Code === 4003) {
        this.Disabled_Cancel = false
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    }
  }
}
</script>