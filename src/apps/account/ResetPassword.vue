<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="10">
          <v-card>
            <v-card-title>重置密码</v-card-title>
            <v-card-text>
              <v-stepper v-model="Step">
                <v-stepper-header>
                  <v-stepper-step step="1">准备</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="2">第一步</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3">第二步</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="4">完成</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card-subtitle>
                      <p>
                        1.重置已知通行证用户名、邮箱或绑定通行证的QQ的通行证密码。
                        <br/>
                        2.我们会向你发送一封带有邮箱验证码的邮件，如果你没有收到，请检查你的邮箱的垃圾邮件。
                      </p>
                    </v-card-subtitle>
                    <v-card-text>
                      <div class="d-flex justify-end">
                        <v-btn color="primary" @click="Step++">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">下一步</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card-text>
                      <v-text-field
                          v-model="ResetPasswordData.Data.Step1.Pass"
                          outlined persistent-hint
                          label="通行证"
                          hint="用户名 / 邮箱 / QQ"
                          prepend-inner-icon="mdi-card-account-details"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                      <div class="d-flex justify-end">
                        <v-btn
                            @click="ResetPassword_Step1"
                            :disabled="ResetPasswordData.Disabled_Step1"
                            :loading="ResetPasswordData.Disabled_Step1"
                            color="primary">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">下一步</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                  <v-stepper-content step="3">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                              v-model="ResetPasswordData.Data.Step2.Password"
                              outlined persistent-hint
                              label="密码"
                              type="password"
                              hint="密码不少于8位字符"
                              prepend-inner-icon="mdi-lock"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                              v-model="ResetPasswordData.Data.Step2.RePassword"
                              outlined hide-details
                              label="确认密码"
                              type="password"
                              prepend-inner-icon="mdi-lock"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                              v-model="ResetPasswordData.Data.Step2.EmailCode"
                              outlined hide-details
                              label="邮箱验证码"
                              prepend-inner-icon="mdi-xml"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text>
                      <div class="d-flex justify-end">
                        <v-btn
                            @click="ReSendEmailCode"
                            :disabled="ReSendEmailCodeBtn.Disabled"
                            color="primary"
                            class="mr-2">
                          <v-icon>mdi-reload</v-icon>
                          <span class="font-weight-medium ml-1">{{ ReSendEmailCodeBtn.Text }}</span>
                        </v-btn>
                        <v-btn
                            @click="ResetPassword_Step2"
                            :disabled="ResetPasswordData.Disabled_Step2"
                            :loading="ResetPasswordData.Disabled_Step2"
                            color="primary">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">下一步</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                  <v-stepper-content step="4">
                    <v-card-subtitle>
                      <p>重置密码完成，你现在可以使用新的密码登入通行证。</p>
                    </v-card-subtitle>
                    <v-card-text>
                      <div class="d-flex justify-end">
                        <v-btn color="primary" to="/Account/Login">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">完成</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "ResetPassword",

  data: () => ({
    Step: 1,
    ReSendEmailCodeBtn: {
      Disabled: false,
      Text: "重发验证码",
      Timer: 60
    },
    ResetPasswordData: {
      Disabled_Step1: false,
      Disabled_Step2: false,
      Data: {
        Step1: {Step: 1, Pass: null},
        Step2: {Step: 2, Password: null, RePassword: null, EmailCode: null},
      }
    }
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo !== null) {
      this.$router.push("/Account/PassCenter")
      this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: "已登入通行证"})
    }
  },

  methods: {
    /* 重新发送邮箱验证码倒计时 */
    ReSendEmailCode_Timer() {
      let Timer = window.setInterval(()=> {
        this.ReSendEmailCodeBtn.Timer--
        this.ReSendEmailCodeBtn.Text = this.ReSendEmailCodeBtn.Timer + "秒"
        if (this.ReSendEmailCodeBtn.Timer === 0) {
          this.ReSendEmailCodeBtn.Disabled = false
          this.ReSendEmailCodeBtn.Text = "重发验证码"
          window.clearInterval(Timer)
        }
      }, 1000)
    },
    /* 重新发送邮箱验证码 */
    ReSendEmailCode() {
      this.ReSendEmailCodeBtn.Disabled = true
      Axios
          .get(this.$store.state.Config.ApiUrl + "Tpcraft/Account/ReSendEmailCode")
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 406) {
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 1005) {
              this.ReSendEmailCodeBtn.Timer = 60
              this.ReSendEmailCode_Timer()
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    },
    /* 重置密码第一步 */
    ResetPassword_Step1() {
      this.ResetPasswordData.Disabled_Step1 = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/ResetPassword", this.ResetPasswordData.Data.Step1)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.ResetPasswordData.Disabled_Step1 = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1021) {
              this.ResetPasswordData.Disabled_Step1 = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 1005) {
              this.Step++
              this.ReSendEmailCodeBtn.Disabled = true
              this.ReSendEmailCode_Timer()
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    },
    /* 重置密码第二步 */
    ResetPassword_Step2() {
      this.ResetPasswordData.Disabled_Step2 = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/ResetPassword", this.ResetPasswordData.Data.Step2)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.ResetPasswordData.Disabled_Step2 = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1007 || Response.data.Code === 1008 || Response.data.Code === 1006) {
              this.ResetPasswordData.Disabled_Step2 = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 1016) {
              this.Step++
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>