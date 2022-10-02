<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>文档</v-card-title>
        <v-card-text>
          <v-card class="mb-4" v-if="NoPermission === false">
            <v-card-subtitle>操作</v-card-subtitle>
            <v-card-text>
              <v-btn color="primary" @click="AddTypeDialog = true">
                <v-icon>mdi-plus</v-icon>
                <span class="ml-2">添加类别</span>
              </v-btn>
              <v-btn color="primary" class="ml-2" @click="AddDocDialog = true">
                <v-icon>mdi-plus</v-icon>
                <span class="ml-2">添加文档</span>
              </v-btn>
            </v-card-text>
          </v-card>
          <v-alert type="info" v-if="Data === null && NoPermission === false">暂无数据</v-alert>
          <v-alert type="warning" v-if="NoPermission === true">权限不足</v-alert>
          <v-expansion-panels v-if="Data !== null">
            <v-expansion-panel v-for="(Data, A) in Data" :key="A">
              <v-expansion-panel-header>
                #{{ Data.Id }} - Top {{ Data.Top }} - {{ Data.Name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mb-2">
                  <v-card-subtitle>操作</v-card-subtitle>
                  <v-card-text>
                    <v-btn
                        @click="OpenEditTypeDialog(A)"
                        color="primary" class="mr-2">
                      <v-icon>mdi-pencil</v-icon>
                      <span class="ml-2">修改</span>
                    </v-btn>
                    <v-btn
                        @click="OpenDeleteTypeDialog(A)"
                        color="error">
                      <v-icon>mdi-delete</v-icon>
                      <span class="ml-2">删除</span>
                    </v-btn>
                  </v-card-text>
                </v-card>
                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(List, B) in Data.List" :key="B">
                      <v-list-item-avatar :color="List.Status == '0' ? 'error' : (List.Status == '1' ? 'warning' : 'success')">
                        <v-icon>{{ List.Status == "0" ? "mdi-close" : (List.Status == "1" ? "mdi-bug" : "mdi-check") }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>#{{ List.Id }} - Top{{ List.Top }} - {{ List.Name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ List.Describe }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="OpenEditDocDialog(A, B)"
                                icon
                                v-bind="attrs" v-on="on">
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>查看/修改</span>
                        </v-tooltip>
                      </v-list-item-action>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="OpenDeleteDocDialog(A, B)"
                                icon
                                v-bind="attrs" v-on="on">
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>删除</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-dialog
          v-model="AddTypeDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>添加类别</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="AddTypeData.Name"
                outlined hide-details
                label="名称"
                prepend-inner-icon="mdi-tag"
            ></v-text-field>
            <v-text-field
                v-model="AddTypeData.Top"
                outlined hide-details
                label="排序" class="mt-2" type="number"
                prepend-inner-icon="mdi-order-numeric-descending"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="AddTypeDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="AddType"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="EditTypeDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>添加类别</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="EditTypeData.Name"
                outlined hide-details
                label="名称"
                prepend-inner-icon="mdi-tag"
            ></v-text-field>
            <v-text-field
                v-model="EditTypeData.Top"
                outlined hide-details
                label="排序" class="mt-2" type="number"
                prepend-inner-icon="mdi-order-numeric-descending"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="EditTypeDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="EditType"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="DeleteTypeDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>删除类别</v-card-title>
          <v-card-text>
            <p>确认删除 {{ DeleteTypeData.Name }} ？</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="DeleteTypeDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="DeleteType"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="AddDocDialog"
          fullscreen hide-overlay
          transition="dialog-bottom-transition">
        <v-card style="background-color: #E9E9E9">
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="AddDocDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>添加文档</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  @click="AddDoc"
                  :disabled="Disabled"
                  :loading="Disabled"
                  dark text>
                <v-icon>mdi-check</v-icon>
                <span class="ml-2">完成</span>
              </v-btn>
            </v-toolbar-items>
           </v-toolbar>
          <v-card-text class="mt-4">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="AddDocData.Name"
                        outlined hide-details
                        label="名称"
                        prepend-inner-icon="mdi-tag"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="AddDocData.Describe"
                        outlined hide-details
                        label="描述"
                        prepend-inner-icon="mdi-script-text-outline"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="AddDocData.Top"
                        outlined hide-details
                        label="排序" type="number"
                        prepend-inner-icon="mdi-order-numeric-descending"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="AddDocData.Status"
                        :items="DocStatus"
                        item-text="Key"
                        item-value="Value"
                        label="状态"
                        outlined hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="AddDocData.Tid"
                        :items="Data"
                        item-text="Name"
                        item-value="Id"
                        label="类别"
                        outlined hide-details
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="mt-4">
              <v-card-text>
                <v-md-editor
                    v-model="AddDocData.Content"
                    left-toolbar="h bold italic strikethrough quote ul ol table hr link image code"
                    right-toolbar="preview"
                    class="mt-4" height="350px"></v-md-editor>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="EditDocDialog"
          fullscreen hide-overlay
          transition="dialog-bottom-transition">
        <v-card style="background-color: #E9E9E9">
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="EditDocDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>添加文档</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  @click="EditDoc"
                  :disabled="Disabled"
                  :loading="Disabled"
                  dark text>
                <v-icon>mdi-check</v-icon>
                <span class="ml-2">完成</span>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-4">
            <v-card>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="EditDocData.Name"
                        outlined hide-details
                        label="名称"
                        prepend-inner-icon="mdi-tag"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="EditDocData.Describe"
                        outlined hide-details
                        label="描述"
                        prepend-inner-icon="mdi-script-text-outline"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="EditDocData.Top"
                        outlined hide-details
                        label="排序" type="number"
                        prepend-inner-icon="mdi-order-numeric-descending"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="EditDocData.Status"
                        :items="DocStatus"
                        item-text="Key"
                        item-value="Value"
                        label="状态"
                        outlined hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="EditDocData.Tid"
                        :items="Data"
                        item-text="Name"
                        item-value="Id"
                        label="类别"
                        outlined hide-details
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="mt-4">
              <v-card-text>
                <v-md-editor
                    v-model="EditDocData.Content"
                    left-toolbar="h bold italic strikethrough quote ul ol table hr link image code"
                    right-toolbar="preview"
                    class="mt-4" height="400px"></v-md-editor>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="DeleteDocDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>删除文档</v-card-title>
          <v-card-text>
            <p>确认删除 {{ DeleteDocData.Name }} ？</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="DeleteDocDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="DeleteDoc"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Documentation",

  data: () => ({
    Disabled: false,
    NoPermission: false,
    Data: null,
    AddTypeDialog: false,
    AddDocDialog: false,
    EditTypeDialog: false,
    EditDocDialog: false,
    DeleteTypeDialog: false,
    DeleteDocDialog: false,
    AddTypeData: {
      Name: null,
      Top: null
    },
    AddDocData: {
      Tid: null,
      Name: null,
      Describe: null,
      Content: "",
      Status: null,
      Top: null,
    },
    EditTypeData: {
      Id: null,
      Name: null,
      Top: null
    },
    EditDocData: {
      Id: null,
      Tid: null,
      Name: null,
      Describe: null,
      Content: "",
      Status: null,
      Top: null,
    },
    DeleteTypeData: {
      Id: null,
      Name: null
    },
    DeleteDocData: {
      Id: null,
      Name: null
    },
    DocStatus: [
      {Key: '开发中', Value: 0},
      {Key: '测试中', Value: 1},
      {Key: '已完成', Value: 2}
    ],
    Timer: null
  }),

  created() {
    /* 获取文档列表 */
    this.GetDocumentation()
    this.Timer = setInterval(this.GetDocumentation, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    GetDocumentation() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/Documentation")
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
    AddType() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/AddType", this.AddTypeData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 1401) {
              this.Disabled = false
              this.AddTypeDialog = false
              this.AddTypeData.Name = null
              this.AddTypeData.Top = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 400) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    },
    AddDoc() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/AddDoc", this.AddDocData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 1401) {
              this.Disabled = false
              this.AddDocDialog = false
              this.AddDocData.Top = null
              this.AddDocData.Describe = null
              this.AddDocData.Tid = null
              this.AddDocData.Name = null
              this.AddDocData.Content = ""
              this.AddDocData.Status = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 400) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    },
    OpenEditTypeDialog(Id) {
      this.EditTypeData.Id = this.Data[Id].Id
      this.EditTypeData.Top =  this.Data[Id].Top
      this.EditTypeData.Name =  this.Data[Id].Name
      this.EditTypeDialog = true
    },
    EditType() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/EditType", this.EditTypeData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 1402) {
              this.Disabled = false
              this.EditTypeDialog = false
              this.EditTypeData.Name = null
              this.EditTypeData.Top = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 400) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    },
    OpenEditDocDialog(Tid, Id) {
      this.EditDocData.Id = this.Data[Tid].List[Id].Id
      this.EditDocData.Name = this.Data[Tid].List[Id].Name
      this.EditDocData.Tid = this.Data[Tid].Id
      this.EditDocData.Top = this.Data[Tid].List[Id].Top
      this.EditDocData.Status = parseInt(this.Data[Tid].List[Id].Status)
      this.EditDocData.Content = this.Data[Tid].List[Id].Content
      this.EditDocData.Describe = this.Data[Tid].List[Id].Describe
      this.EditDocDialog = true
    },
    EditDoc() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/EditDoc", this.EditDocData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 1402) {
              this.Disabled = false
              this.EditDocDialog = false
              this.EditDocData.Id = null
              this.EditDocData.Top = null
              this.EditDocData.Describe = null
              this.EditDocData.Tid = null
              this.EditDocData.Name = null
              this.EditDocData.Content = ""
              this.EditDocData.Status = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 400) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    },
    OpenDeleteTypeDialog(Id) {
      this.DeleteTypeData.Id = this.Data[Id].Id
      this.DeleteTypeData.Name = this.Data[Id].Name
      this.DeleteTypeDialog = true
    },
    DeleteType() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/DeleteType", this.DeleteTypeData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 1404) {
              this.Disabled = false
              this.DeleteTypeDialog = false
              this.DeleteTypeData.Id = null
              this.DeleteTypeData.Name = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 400) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    },
    OpenDeleteDocDialog(Tid, Id) {
      this.DeleteDocData.Id = this.Data[Tid].List[Id].Id
      this.DeleteDocData.Name = this.Data[Tid].List[Id].Name
      this.DeleteDocDialog = true
    },
    DeleteDoc() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Doc/DeleteDoc", this.DeleteDocData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 1404) {
              this.Disabled = false
              this.DeleteDocDialog = false
              this.DeleteDocData.Id = null
              this.DeleteDocData.Name = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 400) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>