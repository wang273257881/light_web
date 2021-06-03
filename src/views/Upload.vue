<template>
    <div>
        <div>
            <h2>数据库部署</h2>
            <el-divider></el-divider>
            <ul>
                <li>点击 <i class="el-icon-coin"/>数据库 进入数据库管理界面</li>
                <li>点击“新建集合”新建集合userList</li>
                <li>以此类推，再新建集合workList、idCounter、commits_of_work、commitList</li>
            </ul>
            <el-divider></el-divider>
            <ul>
                <li>点击集合名称进入集合idCounter</li>
                <li>点击“添加文档”添加一条文档</li>
                <li>添加字段workCount，类型number，值为0</li>
                <li>添加字段commitCount，类型number，值为0</li>
                <li>添加字段workCount，类型number，值为0</li>
                <li>点击确认</li>
                <li>记录该条文档的“_id”值</li>
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'upload',
    data() {
        return {
           
        };
    }
};
</script>