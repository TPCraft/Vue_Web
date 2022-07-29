<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>游戏登入</v-card-title>
        <v-card-subtitle>登入请求列表</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col md="12" v-if="Data === null">
              <v-alert type="info">暂无登入请求</v-alert>
            </v-col>
            <v-col
                v-for="(Data, I) in Data"
                :key="I"
                md="4">
              <v-card>
                <v-card-title>#{{ Data.Id }} - {{ Data.Username }}</v-card-title>
                <v-card-subtitle>
                  {{ Data.Game }} - #{{ Data.Server }}
                </v-card-subtitle>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text>
                  请在 <span class="error--text">{{ (Date.parse(new Date(Data.ExpiredDate)) - Date.parse(new Date())) / 1000 }}</span> 秒内完成登入
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      @click="Cancel(Data.Id)"
                      :disabled="Disabled"
                      :loading="Disabled"
                      color="warning">
                    <v-icon>mdi-cancel</v-icon>
                    <span class="ml-2">取消</span>
                  </v-btn>
                  <v-btn
                      @click="Login(Data.Id)"
                      :disabled="Disabled"
                      :loading="Disabled"
                      color="success" >
                    <v-icon>mdi-login</v-icon>
                    <span class="ml-2">登入</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-pagination v-model="Page" :length="PageTotal" class="mt-2"></v-pagination>
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
    Disabled: false,
    Page: 1,
    PageTotal: 1
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
      if (Data.Data !== null) {
        this.PageTotal = Math.ceil(Data.Data[0].Total / 9)
      }
      this.Data = Data.Data
    },
    /* 登入 */
    Login(Id) {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Game/Login", {Id: Id})
          .then(Response => (
              this.CallBack_Login(Response.data)
          ))
    },
    /* 登入回调 */
    CallBack_Login(Data) {
      if (Data.Code === 500) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 4001) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 4002) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    },
    /* 取消登入 */
    Cancel(Id) {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Game/Cancel", {Id: Id})
          .then(Response => (
              this.CallBack_Cancel(Response.data)
          ))
    },
    /* 登入回调 */
    CallBack_Cancel(Data) {
      if (Data.Code === 500) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 4001) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 4003) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    }
  }
}
</script>