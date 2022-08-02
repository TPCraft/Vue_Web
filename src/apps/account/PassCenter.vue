<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>通行证中心</v-card-title>
        <v-card-text>
          <v-card>
            <v-card-text>
              <v-tabs v-model="Tab" color="primary" centered icons-and-text grow>
                <v-tab href="#Tab-1">
                  信息
                  <v-icon>mdi-card-account-details</v-icon>
                </v-tab>
                <v-tab href="#Tab-2">
                  第三方
                  <v-icon>mdi-contacts</v-icon>
                </v-tab>
                <v-tab href="#Tab-3">
                  设置
                  <v-icon>mdi-cog</v-icon>
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="Tab">
                <v-tab-item value="Tab-1">
                  <v-card-text>
                    <v-alert
                        v-if="$store.state.PsssInfo.Ban.Ban === '1'"
                        type="error">
                      通行证封禁中</v-alert>
                    <v-alert
                        v-if="$store.state.PsssInfo.Ban.Ban === '0'"
                        type="success">
                      通行证正常</v-alert>
                    <v-row no-gutters>
                      <v-col cols="12" md="6">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-img :src="$store.state.PsssInfo.AvatarUrl"></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>#{{ $store.state.PsssInfo.Uid }} {{ $store.state.PsssInfo.Username }}</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Email }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-barcode-scan</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>UUID</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Uuid }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-clipboard:copy="$store.state.PsssInfo.Uuid"
                                    icon v-bind="attrs" v-on="on">
                                  <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>复制</span>
                            </v-tooltip>
                          </v-list-item-action>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-checkbox-multiple-marked</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>签到</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Signin.Signin === '0' ? "今日未签到" : "今日已签到" }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action v-if="$store.state.PsssInfo.Signin.Signin === '0'">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    @click="Signin"
                                    icon v-bind="attrs" v-on="on">
                                  <v-icon>mdi-square-edit-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>签到</span>
                            </v-tooltip>
                          </v-list-item-action>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-checkbox-multiple-marked</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>已签到天数</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Signin.Day }} 天</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-flash</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>等级</v-list-item-title>
                            <v-list-item-subtitle>Lv.{{ $store.state.PsssInfo.Level.Level }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-flash</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>EXP</v-list-item-title>
                            <v-list-item-subtitle>
                              <v-progress-linear :value="($store.state.PsssInfo.Level.Exp / $store.state.PsssInfo.Level.NextLevelExp) * 100" height="20">
                                {{ $store.state.PsssInfo.Level.Exp }} / {{ $store.state.PsssInfo.Level.NextLevelExp }}
                              </v-progress-linear>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-cancel</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>封禁</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Ban.Ban === "0" ? "未封禁" : "封禁中" }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    @click="BanInfoDialog = true"
                                    icon v-bind="attrs" v-on="on">
                                  <v-icon>mdi-information</v-icon>
                                </v-btn>
                              </template>
                              封禁信息
                            </v-tooltip>
                          </v-list-item-action>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-key</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>访问密钥</v-list-item-title>
                            <v-list-item-subtitle>{{ Desensitization($store.state.PsssInfo.AccessKey, 4, 4) }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-clipboard:copy="$store.state.PsssInfo.AccessKey"
                                    icon v-bind="attrs" v-on="on">
                                  <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>复制</span>
                            </v-tooltip>
                          </v-list-item-action>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-account-multiple</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>用户组</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Group == "0" ? "普通用户" : ($store.state.PsssInfo.Group == "1" ? "超级管理员" : ($store.state.PsssInfo.Group == "2" ? "二级管理员" : "一级管理员")) }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-cash-multiple</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>先锋币</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.Coin }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-timelapse</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>注册日期</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.RegisterDate }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-ip</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>注册IP</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.RegisterIp }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-timelapse</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>最后在线</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.LastOnlineDate }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-ip</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>最后在线IP</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.PsssInfo.LastOnlineIp }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-tab-item>
                <v-tab-item value="Tab-2">
                  <v-card-text>
                    <v-alert type="info">第三方账户30分钟同步一次</v-alert>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-card>
                          <v-card-title>
                            <v-avatar size="32">
                              <v-icon>mdi-qqchat</v-icon>
                            </v-avatar>
                            <span class="font-weight-light ml-2">QQ</span>
                          </v-card-title>
                          <v-card-text>
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img :src="$store.state.PsssInfo.Qq.AvatarUrl"></v-img>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{ $store.state.PsssInfo.Qq.Username }}</v-list-item-title>
                                <v-list-item-subtitle>{{ $store.state.PsssInfo.Qq.Qq }}</v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-clipboard:copy="$store.state.PsssInfo.Qq.Qq"
                                        icon v-bind="attrs" v-on="on">
                                      <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>复制QQ</span>
                                </v-tooltip>
                              </v-list-item-action>
                              <v-list-item-action v-if="$store.state.PsssInfo.QqVerify === '0'">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        @click="QqVerify"
                                        icon v-bind="attrs" v-on="on">
                                      <v-icon>mdi-shield-check</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>点击验证QQ</span>
                                </v-tooltip>
                              </v-list-item-action>
                            </v-list-item>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-card>
                          <v-card-title>
                            <v-avatar size="32">
                              <v-icon>mdi-steam</v-icon>
                            </v-avatar>
                            <span class="font-weight-light ml-2">Steam</span>
                          </v-card-title>
                          <v-card-text>
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img v-if="$store.state.PsssInfo.Steam.Id !== null" :src="$store.state.PsssInfo.Steam.AvatarUrl"></v-img>
                                <v-icon v-if="$store.state.PsssInfo.Steam.Id === null">mdi-steam</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{ $store.state.PsssInfo.Steam.Id === null ? "未绑定" : $store.state.PsssInfo.Steam.Username }}</v-list-item-title>
                                <v-list-item-subtitle>{{ $store.state.PsssInfo.Steam.Id === null ? "未绑定" : $store.state.PsssInfo.Steam.Id }}</v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-action v-if="$store.state.PsssInfo.Steam.Id === null">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        @click="BindSteam"
                                        icon v-bind="attrs" v-on="on">
                                      <v-icon>mdi-connection</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>绑定Steam</span>
                                </v-tooltip>
                              </v-list-item-action>
                              <v-list-item-action v-if="$store.state.PsssInfo.Steam.Id !== null">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-clipboard:copy="$store.state.PsssInfo.Steam.Id"
                                        icon v-bind="attrs" v-on="on">
                                      <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>复制Steam</span>
                                </v-tooltip>
                              </v-list-item-action>
                              <v-list-item-action v-if="$store.state.PsssInfo.Steam.Id !== null">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        :href="$store.state.PsssInfo.Steam.ProfileUrl"
                                        icon v-bind="attrs" v-on="on"
                                        target="_blank">
                                      <v-icon>mdi-web</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>前往Steam个人资料</span>
                                </v-tooltip>
                              </v-list-item-action>
                            </v-list-item>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-tab-item>
                <v-tab-item value="Tab-3">
                  <v-card-text>
                    <v-list>
                      <v-list-item-group>
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <v-list-item @click="ChangeAvatarDialog = true">
                              <v-list-item-avatar>
                                <v-icon>mdi-image-edit</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>修改头像</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-list-item @click="ResetAccessKey">
                              <v-list-item-avatar>
                                <v-icon>mdi-reload</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>重置访问密钥</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-list-item to="/Account/ChangePassword">
                              <v-list-item-avatar>
                                <v-icon>mdi-lock</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>修改密码</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-list-item-group>
                    </v-list>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
      <v-dialog persistent fullscreen v-model="BanInfoDialog">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="BanInfoDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>封禁信息</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
                v-if="$store.state.PsssInfo.Ban.History === null"
                type="info" class="mt-4">
              暂无数据
            </v-alert>
            <v-timeline v-if="$store.state.PsssInfo.Ban.History !== null" dense>
              <v-slide-x-reverse-transition group hide-on-leave>
                <v-timeline-item
                    v-for="(BanInfo, I) in $store.state.PsssInfo.Ban.History" :key="I"
                    small fill-dot>
                  <v-card>
                    <v-card-title>#{{ BanInfo.Id }}</v-card-title>
                    <v-card-subtitle>
                      封禁时间 {{ BanInfo.Date }}
                      <br/>
                      解封时间 {{ BanInfo.ExpiredDate == "1970-01-01 07:59:59" ? "永久封禁" : BanInfo.ExpiredDate }}
                    </v-card-subtitle>
                    <v-card-text>
                      <h3>{{ BanInfo.Reason }}</h3>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-slide-x-reverse-transition>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="ChangeAvatarDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>修改头像</v-card-title>
          <v-card-text class="text-center">
            <ImageCutter @cutDown="PreviewAvatar" rate="1:1"/>
            <div v-if="UploadAvatarData.Preview !== null" class="mt-4">
              <p>头像预览</p>
              <v-avatar size="128px">
                <v-img :src="UploadAvatarData.Preview"/>
              </v-avatar>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="ChangeAvatarDialog = false, UploadAvatarData.Preview = null">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="UploadAvatar"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-upload</v-icon>
              <span class="ml-2">上传</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="QqVerifyDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>QQ验证</v-card-title>
          <v-card-text>
            <v-text-field
                :value="QqVerifyData.VerifyCode"
                outlined hide-details readonly
                label="验证码"
                prepend-inner-icon="mdi-xml"
            ></v-text-field>
            <v-text-field
                :value="QqVerifyData.ExpiredDate"
                outlined hide-details readonly
                label="过期时间" class="mt-2"
                prepend-inner-icon="mdi-timer"
            ></v-text-field>
            <p class="mt-2">
              QQ验证帮助：<a href="https://community.tpcraft.cn/d/32" target="_blank">https://community.tpcraft.cn/d/32</a>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="QqVerifyDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">关闭</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";
import ImageCutter from "vue-img-cutter";


export default {
  name: "PassCenter",

  components: {
    ImageCutter
  },

  data: () => ({
    Tab: null,
    Disabled: false,
    BanInfoDialog: false,
    ChangeAvatarDialog: false,
    QqVerifyDialog: false,
    UploadAvatarData: {
      Data: null,
      Preview: null
    },
    QqVerifyData: {
      VerifyCode: null,
      ExpiredDate: null
    }
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/Login")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
  },

  methods: {
    /* 去敏操作 */
    Desensitization(String = "", Start, End) {
      var Length = String.length - Start - End;
      var xing = '';
      for (var i = 0; i < Length; i++) {
        xing += "*";
      }
      return String.substring(0, Start) + xing + String.substring(String.length - End);
    },
    /* 签到 */
    Signin() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "/Tpcraft/Account/Signin", {Mode: "Api"})
          .then(Response => (
              this.CallBack_Signin(Response.data)
          ))
    },
    /* 签到回调 */
    CallBack_Signin(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 1021) {
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message + "，本次签到获得 " + Data.Data.Exp + " Exp"})
      }
    },
    /* Qq验证 */
    QqVerify() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "/Tpcraft/Account/QqVerify")
          .then(Response => (
              this.CallBack_QqVerify(Response.data)
          ))
    },
    /* QQ验证回调 */
    CallBack_QqVerify(Data) {
      /* 检查响应数据 */
      if (Data.Code === 200) {
        this.QqVerifyData.VerifyCode = Data.Data.VerifyCode
        this.QqVerifyData.ExpiredDate = Data.Data.ExpiredDate
        this.QqVerifyDialog = true
      }
      if (Data.Code === 500) {
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
    },
    /* 绑定Steam */
    BindSteam() {
      var Window
      if (navigator.userAgent.match(/(Mobile|Android|Tablet)/)) {
        Window = window.open("")
        Window.open()
      } else {
        var Top = (window.screen.availHeight - 30 - 800) / 2
        var Left = (window.screen.availWidth - 10 - 1000) / 2
        Window = window.open("https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=" + this.$store.state.Config.AppUrl + "Auth/Bind/Steam&openid.realm=" + this.$store.state.Config.AppUrl + "Auth/Bind/Steam&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select", "Steam 绑定 - 互联 | TPCraft 时代先锋", "top=" + Top + ",left=" + Left + ",width=1000,height=800")
        Window.open()
      }
    },
    /* 预览头像 */
    PreviewAvatar(File) {
      this.UploadAvatarData.Data = File.file
      this.UploadAvatarData.Preview = File.dataURL
    },
    /* 上传头像 */
    UploadAvatar() {
      this.Disabled = true
      let UploadData = new FormData()
      UploadData.append("File", this.UploadAvatarData.Data)
      Axios
          .post(this.$store.state.Config.ApiUrl + "/Tpcraft/Account/UploadAvatar", UploadData)
          .then(Response => (
              this.CallBack_UploadAvatar(Response.data)
          ))
    },
    /* 上传头像回调 */
    CallBack_UploadAvatar(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 5000) {
        this.UploadAvatarData.Data = null
        this.UploadAvatarData.Preview = null
        this.ChangeAvatarDialog = false
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
      if (Data.Code === 5001 || Data.Code === 5002 || Data.Code === 5003) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
    },
    /* 重置访问密钥 */
    ResetAccessKey() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "/Tpcraft/Account/ResetAccessKey")
          .then(Response => (
              this.CallBack_ResetAccessKey(Response.data)
          ))
    },
    /* 重置访问密钥回调 */
    CallBack_ResetAccessKey(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 1017) {
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
    }
  }
}
</script>