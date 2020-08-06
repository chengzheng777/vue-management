<template>
    <div class="user-container">
        <!-- 工具栏 -->
        <div class="toolbar">
            <el-form :inline="true" :model="filters" size="small">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="findPage(null)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <kt-button label="新增" perms="sys:user:add" type="primary" @click="handleAdd" />
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格内容栏 -->
        <kt-table
            permsEdit="sys:user:edit"
            permsDelete="sys:user:delete"
            :data="pageResult" 
            :columns="columns"
            @findPage="findPage"
            @handleEdit="handleEdit"
            @handleDelete="handleDelete">
        </kt-table>
        <!-- 新增编辑界面 -->
        <el-dialog
            width="40%"
            :title="operation ? '新增' : '编辑'"
            :visible.sync="editDialogVisible"
            :close-on-click-modal="false">
            <el-form 
                label-width="80px"
                :model="dataForm"  
                :rules="dataFormRules" 
                ref="dataForm">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="dataForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="机构" prop="deptName">
                    <popup-tree-input 
                        :data="deptData" 
                        :props="deptTreeProps" 
                        :prop="dataForm.deptName" 
                        :nodeKey="''+dataForm.deptId" 
                        :currentChangeHandle="deptTreeCurrentChangeHandle">
                    </popup-tree-input>
                </el-form-item>
                
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="dataForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <!-- footer需要具名为 footer 的 slot -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput";
import KtTable from "@/views/Core/KtTable";
import KtButton from "@/views/Core/KtButton";

export default {
    components: {
        PopupTreeInput,
        KtTable,
        KtButton

    },
    data() {
        return {
            filters: {
                name: ''
            },
            // 表格标题
            columns: [
                {prop:"id", label:"ID", minWidth:40, sortable:"false"},
                {prop:"name", label:"用户名", minWidth:120, sortable:"true"},
                {prop:"deptName", label:"机构", minWidth:120, sortable:"true"},
                {prop:"email", label:"邮箱", minWidth:120, sortable:"true"},
                {prop:"mobile", label:"手机", minWidth:120, sortable:"true"}
            ],
            pageRequest: { pageNum: 1, pageSize: 8 },
            pageResult: {},

            operation: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false, // 加载状态开关
            dataFormRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            // 新增编辑界面数据
            dataForm: {
                id: 0,
                name: '',
                password: '',
                deptId: 1,
                deptName: '',
                email: 'test@qq.com',
                mobile: '13800000023',
                status: 1
            },
            // 机构数据
            deptData: [],
            deptTreeProps: {
                label: 'name',
                children: 'children'
            }
        }
    },
    methods: {
        // 获取分页数据
        findPage(data) {
            if(data !== null) {
                this.pageRequest = data.pageRequest
            };
            this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name}};
            this.$api.user.findPage(this.pageRequest)
                .then((res) => {
                    this.pageRequest = res.data;
                })
        },
        // 新增按钮
        handleAdd() {
            // 显示对话框
            this.editDialogVisible = true;
            // 标题为新增
            this.operation = true;
            // 初始数据
            this.dataForm = {
                id: 0,
                name: '',
                password: '',
                deptId: 1,
                deptName: '',
                email: 'test@qq.com',
                mobile: '13889700023',
                status: 1
            }
        },
        // 提交按钮
        editSubmit() {
            this.$refs.dataForm.validate((valid) => {
                if(valid) {
                    // 这是 element-Ui 库里面的弹窗提示
                    this.$confirm('确认提交吗', '提示', {}).then(() => {
                        this.editLoading = true;    // 加载动画打开
                        let params = Object.assign({}, this.dataForm);  // 拷贝？ 对象只有一级属性时候是深拷贝。但是对象中有对象，此方法在二级属性之后就是浅拷贝
                        this.$api.user.save(params).then((res) => {
                            this.editLoading = false; // 提交成功 关闭动画
                            this.$message({ message: '提交成功', type: 'success'})  // this.$message() 应该是Element 库里面自带的，使用直接弹窗
                            this.$refs['dataForm'].resetFields();   // 重置数据
                            this.editDialogVisible = false; // 关闭对话框
                            this.findPage(null);    // 恢复
                        })
                    })
                }
            })
        },
        // 批量删除
        handleDelete(data) {
            this.$api.user.batchDelete(data.params).then(data.callback)
        },
        // 显示边界界面
        handleEdit(params) {
            this.editDialogVisible = true;
            this.operation = false;
            this.dataForm = Object.assign({}, params.row)
        },
        // 获取部门列表
        findDeptTree() {
            this.$api.dept.findDeptTree().then((res) => {
                this.deptData = res.data;
            })
        },
        // 菜单树选中
        deptTreeCurrentChangeHandle (data, node) {
            this.dataForm.deptId = data.id;
            this.dataForm.deptName = data.name
        }
    },
    mounted() {
        this.findDeptTree()
    }
}
</script>

<style lang="scss" scoped>
    .user-container {
        width: 100%;
        .toolbar {
            float: left;
            padding: 18px;
        }
    }
</style>