<template>
    <div>
        <div>
            <h2>项目下载</h2>
            <el-divider></el-divider>
            <div>见“源代码”</div>
            <el-divider></el-divider>
            <h2>参数修改</h2>
            <el-divider></el-divider>
            <div>打开文件“lib/tools/GlobalInfo.dart”，找到CloudBaseInfo，修改其参数如下：</div>
            <el-divider></el-divider>
            <h4>env</h4>
            <el-divider></el-divider>
            <div>你的环境id</div>
            <el-divider></el-divider>
            <h4>accessKey</h4>
            <el-divider></el-divider>
            <ul>
                <li>点击 环境 -> 安全配置</li>
                <li>在“移动应用安全来源”点击“添加应用”</li>
                <li>输入应用标识 com.example.homework</li>
                <li>点击确认</li>
                <li>点击获取凭证，记录之</li>
                <li>修改accessKey为之</li>
            </ul>
            <el-divider></el-divider>
            <h4>fileStorge</h4>
            <el-divider></el-divider>
            <div>你在云存储中记录的fileid的文件名之前的部分（不含“/”）</div>
            <el-divider></el-divider>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'icon',
    data() {
        return {
           
        };
    }
};
</script>