<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>第三方授权</v-card-title>
        <v-card-text v-if="Code === null">
          <v-alert type="info">{{ Text }}</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200">
          <v-row justify="center">
            <v-col md="5">
              <div class="text-center">
                <v-avatar size="128px">
                  <v-img :src="Data.Logo" />
                </v-avatar>
                <h2 class="mt-4">授权 <span class="info--text">{{ Data.Name }}</span></h2>
              </div>
              <v-card class="mt-4">
                <v-card-text>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img :src="$store.state.PsssInfo.AvatarUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ $store.state.PsssInfo.Username }}</v-list-item-title>
                      <v-list-item-subtitle>使用此通行证授权</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon>mdi-card-account-details</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>共享通行证信息</v-list-item-title>
                      <v-list-item-subtitle>UUID、用户名、头像、等级、封禁等</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-row>
                    <v-col md="6">
                      <v-btn
                          @click="$router.push('/')"
                          block
                          color="warning">
                        <v-icon>mdi-cancel</v-icon>
                        <span class="ml-2">取消</span>
                      </v-btn>
                    </v-col>
                    <v-col md="6">
                      <v-btn
                          :href="$store.state.Config.ApiUrl + '/Oauth/Authorize?client_id=' + $route.query.ClientId + '&response_type=' + $route.query.ResponseType + '&state=' + $route.query.State"
                          block
                          color="success">
                        <v-icon>mdi-login</v-icon>
                        <span class="ml-2">授权</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <p class="text-center mt-4">授权后重定向至 <span class="info--text">{{ Data.RedirectUrl }}</span></p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-if="Code === 400 || Code === 500">
          <v-alert type="error">{{ Text }}</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 3004 || Code === 3005">
          <v-alert type="warning">{{ Text }}</v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Authorize",

  data: () => ({
    Code: null,
    Text: "请稍后......",
    Data: null
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/PassCenter")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 检查Oauth客户端 */
    this.CheckOauth()
  },

  methods: {
    /* 检查Oauth客户端 */
    CheckOauth() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Oauth/Check", {ClientId: this.$route.query.ClientId})
          .then(Response => (
              this.CallBack_CheckOauth(Response.data)
          ))
    },
    /* 检查Oauth客户端回调 */
    CallBack_CheckOauth(Data) {
      if (Data.Code === 200) {
        this.Code = Data.Code
        this.Data = Data.Data
      }
      if (Data.Code === 400 || Data.Code === 500) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
      if (Data.Code === 3004 || Data.Code === 3005) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
    }
  }
}
</script>