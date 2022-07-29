<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="10">
          <v-card>
            <v-card-title>修改密码</v-card-title>
            <v-card-text>
              <v-stepper v-model="Step">
                <v-stepper-header>
                  <v-stepper-step step="1">准备</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="2">第一步</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3">完成</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card-subtitle>
                      <p>
                        1.我们会向你发送一封带有邮箱验证码的邮件，如果你没有收到，请检查你的邮箱的垃圾邮件。
                        <br/>
                        2.修改密码后需要使用新的密码重新登入通行证。
                      </p>
                    </v-card-subtitle>
                    <v-card-text>
                      <div class="d-flex justify-end">
                        <v-btn
                            @click="ChangePasswordData_Step1"
                            :disabled="ChangePasswordData.Disabled_Step1"
                            :loading="ChangePasswordData.Disabled_Step1"
                            color="primary">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">下一步</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                              v-model="ChangePasswordData.Data.Step2.Password"
                              outlined persistent-hint
                              label="密码"
                              type="password"
                              hint="密码不少于8位字符"
                              prepend-inner-icon="mdi-lock"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                              v-model="ChangePasswordData.Data.Step2.RePassword"
                              outlined hide-details
                              label="确认密码"
                              type="password"
                              prepend-inner-icon="mdi-lock"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                              v-model="ChangePasswordData.Data.Step2.EmailCode"
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
                            @click="ChangePasswordData_Step2"
                            :disabled="ChangePasswordData.Disabled_Step2"
                            :loading="ChangePasswordData.Disabled_Step2"
                            color="primary">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">下一步</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                  <v-stepper-content step="3">
                    <v-card-subtitle>
                      <p>修改密码完成，请重新登入通行证，你现在可以使用新的密码登入通行证。</p>
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
  name: "ChangePassword",

  data: () => ({
    Step: 1,
    ReSendEmailCodeBtn: {
      Disabled: false,
      Text: "重发验证码",
      Timer: 60
    },
    ChangePasswordData: {
      Disabled_Step1: false,
      Disabled_Step2: false,
      Data: {
        Step1: {Step: 1},
        Step2: {Step: 2, Password: null, RePassword: null, EmailCode: null},
      }
    }
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/PassCenter")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
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
          .then(Response => (
              this.CallBack_ReSendEmailCode(Response.data)
          ))
    },
    /* 重新发送邮箱验证码回调 */
    CallBack_ReSendEmailCode(Data) {
      /* 检查响应数据 */
      if (Data.Code === 406) {
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 1023) {
        this.ReSendEmailCodeBtn.Timer = 60
        this.ReSendEmailCode_Timer()
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    },
    /* 修改密码第一步 */
    ChangePasswordData_Step1() {
      this.ChangePasswordData.Disabled_Step1 = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/ChangePassword", this.ChangePasswordData.Data.Step1)
          .then(Response => (
              this.CallBack_ChangePasswordData_Step1(Response.data)
          ))
    },
    /* 修改密码第一步回调 */
    CallBack_ChangePasswordData_Step1(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 1023) {
        this.Step++
        this.ReSendEmailCodeBtn.Disabled = true
        this.ReSendEmailCode_Timer()
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    },
    /* 修改密码第二步 */
    ChangePasswordData_Step2() {
      this.ChangePasswordData.Disabled_Step2 = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/ChangePassword", this.ChangePasswordData.Data.Step2)
          .then(Response => (
              this.CallBack_ChangePasswordData_Step2(Response.data)
          ))
    },
    /* 修改密码第二步回调 */
    CallBack_ChangePasswordData_Step2(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.ResetPasswordData.Disabled_Step2 = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 1011 || Data.Code === 1012 || Data.Code === 1013) {
        this.ResetPasswordData.Disabled_Step2 = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 1014) {
        this.Step++
        setTimeout(() => (window.location.href = "/Account/Login"), 3000)
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    }
  }
}
</script>