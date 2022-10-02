<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>文档</v-card-title>
        <v-card-text>
          <v-alert type="info" v-if="Data === null">暂无数据</v-alert>
          <v-expansion-panels v-if="Data !== null">
            <v-expansion-panel v-for="(Data, A) in Data" :key="A">
              <v-expansion-panel-header>
                {{ Data.Name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(List, B) in Data.List" :key="B" @click="OpenDialog(A, B)">
                      <v-list-item-avatar :color="List.Status == '0' ? 'error' : (List.Status == '1' ? 'warning' : 'success')">
                        <v-icon>{{ List.Status == "0" ? "mdi-close" : (List.Status == "1" ? "mdi-bug" : "mdi-check") }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ List.Name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ List.Describe }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-container>
    <v-dialog
        v-model="Dialog"
        fullscreen hide-overlay
        transition="dialog-bottom-transition">
      <v-card style="background-color: #E9E9E9">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="Dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ DialogData.Name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-card>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-avatar :color="DialogData.Status == '0' ? 'error' : (DialogData.Status == '1' ? 'warning' : 'success')">
                      <v-icon>{{ DialogData.Status == "0" ? "mdi-close" : (DialogData.Status == "1" ? "mdi-bug" : "mdi-check") }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>状态</v-list-item-title>
                      <v-list-item-subtitle>{{ DialogData.Status === "0" ? "开发中" : (DialogData.Status === "1" ? "测试中" : "已完成") }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon>mdi-timer</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>创建时间</v-list-item-title>
                      <v-list-item-subtitle>{{ DialogData.CreateDate }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon>mdi-timer</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>更新时间</v-list-item-title>
                      <v-list-item-subtitle>{{ DialogData.UpdateDate }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-text>
              <v-md-preview :text="DialogData.Content"></v-md-preview>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Documentation",

  data: () => ({
    Data: null,
    Dialog: false,
    DialogData: {
      Name: null,
      Describe: null,
      Content: "",
      Status: null,
      CreateDate: null,
      UpdateDate: null,
    }
  }),

  created() {
    /* 获取文档列表 */
    this.GetDocumentation()
  },

  methods: {
    GetDocumentation() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "Tpcraft/Doc/Documentation")
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 200) {
              this.Data = Response.data.Data
            }
            if (Response.data.Code === 500) {
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    },
    OpenDialog(Tid, Id) {
      this.DialogData.Name = this.Data[Tid].List[Id].Name
      this.DialogData.Status = this.Data[Tid].List[Id].Status
      this.DialogData.Describe = this.Data[Tid].List[Id].Describe
      this.DialogData.Content = this.Data[Tid].List[Id].Content
      this.DialogData.CreateDate = this.Data[Tid].List[Id].CreateDate
      this.DialogData.UpdateDate = this.Data[Tid].List[Id].UpdateDate
      this.Dialog = true
    }
  }
}
</script>