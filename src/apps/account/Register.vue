<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="10">
          <v-card>
            <v-card-title>注册通行证</v-card-title>
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
                        1.准备一个QQ号、@qq.com的邮箱。
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
                      <v-row>
                        <v-col md="4">
                          <v-text-field
                              v-model="RegisterData.Data.Step1.Username"
                              outlined persistent-hint
                              label="用户名"
                              hint="用户名不少于3位字符，且只能使用大小写字母、数字、下划线"
                              prepend-inner-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                        <v-col md="4">
                          <v-text-field
                              v-model="RegisterData.Data.Step1.Qq"
                              outlined persistent-hint
                              label="Qq"
                              prepend-inner-icon="mdi-qqchat"
                          ></v-text-field>
                        </v-col>
                        <v-col md="4">
                          <v-text-field
                              v-model="RegisterData.Data.Step1.Email"
                              outlined persistent-hint
                              label="邮箱"
                              hint="仅限@qq.com"
                              prepend-inner-icon="mdi-email"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text>
                      <div class="d-flex justify-end">
                        <v-btn
                            @click="Register_Step1"
                            :disabled="RegisterData.Disabled_Step1"
                            :loading="RegisterData.Disabled_Step1"
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
                        <v-col md="4">
                          <v-text-field
                              v-model="RegisterData.Data.Step2.Password"
                              outlined persistent-hint
                              label="密码"
                              type="password"
                              hint="密码不少于8位字符"
                              prepend-inner-icon="mdi-lock"
                          ></v-text-field>
                        </v-col>
                        <v-col md="4">
                          <v-text-field
                              v-model="RegisterData.Data.Step2.RePassword"
                              outlined hide-details
                              label="确认密码"
                              type="password"
                              prepend-inner-icon="mdi-lock"
                          ></v-text-field>
                        </v-col>
                        <v-col md="4">
                          <v-text-field
                              v-model="RegisterData.Data.Step2.EmailCode"
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
                            @click="Register_Step2"
                            :disabled="RegisterData.Disabled_Step2"
                            :loading="RegisterData.Disabled_Step2"
                            color="primary">
                          <v-icon>mdi-play</v-icon>
                          <span class="font-weight-medium ml-1">下一步</span>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-stepper-content>
                  <v-stepper-content step="4">
                    <v-card-subtitle>
                      <p>注册完成，你现在可以使用新注册的账户登入通行证。</p>
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
  name: "Register",

  data: () => ({
    Step: 1,
    ReSendEmailCodeBtn: {
      Disabled: false,
      Text: "重新发送邮箱验证码",
      Timer: 60
    },
    RegisterData: {
      Disabled_Step1: false,
      Disabled_Step2: false,
      Data: {
        Step1: {Step: 1, Username: null, Qq: null, Email: null},
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
          this.ReSendEmailCodeBtn.Text = "重新发送邮箱验证码"
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
        this.ReSendEmailCodeBtn.Disabled = true
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 1023) {
        this.ReSendEmailCodeBtn.Timer = 60
        this.ReSendEmailCode_Timer()
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    },
    /* 注册第一步 */
    Register_Step1() {
      this.RegisterData.Disabled_Step1 = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/Register", this.RegisterData.Data.Step1)
          .then(Response => (
              this.CallBack_Register_Step1(Response.data)
          ))
    },
    /* 注册第一步回调 */
    CallBack_Register_Step1(Data) {
      /* 检查响应数据 */
      if (Data.Code === 1005 || Data.Code === 1006 || Data.Code === 1007 || Data.Code === 1008 || Data.Code === 1009 || Data.Code === 1010) {
        this.RegisterData.Disabled_Step1 = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 1023) {
        this.Step++
        this.ReSendEmailCodeBtn.Disabled = true
        this.ReSendEmailCode_Timer()
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    },
    /* 注册第二步 */
    Register_Step2() {
      this.RegisterData.Disabled_Step2 = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/Register", this.RegisterData.Data.Step2)
          .then(Response => (
              this.CallBack_Register_Step2(Response.data)
          ))
    },
    /* 注册第二步回调 */
    CallBack_Register_Step2(Data) {
      /* 检查响应数据 */
      if (Data.Code === 1011 || Data.Code === 1012 || Data.Code === 1007 || Data.Code === 1013 || Data.Code === 1008 || Data.Code === 1009 || Data.Code === 1010) {
        this.RegisterData.Disabled_Step2 = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 1004) {
        this.Step++
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    }
  }
}
</script>\