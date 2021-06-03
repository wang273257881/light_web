<template>
    <div>
        <div>
            <h2>腾讯云IM登录</h2>
            <el-divider></el-divider>
            <span>进入 
                <el-link icon="el-icon-link" href="https://console.cloud.tencent.com/im" type="primary" underline="false">腾讯云控制台 · IM</el-link> 
                </span>
        </div>
        <el-divider></el-divider>
        <div>
            <h2>应用创建</h2>
            <el-divider></el-divider>
            <ul>
                <li>点击“创建新应用”并输入一个你认为顺眼的名称</li>
                <li>点击确认</li>
                <li>记录SDKAppID及密钥</li>
            </ul>
        </div>
        <el-divider></el-divider>
        <div>
            <h2>参数更改</h2>
            <el-divider></el-divider>
            <span>打开文件“lib/Tecent/utils/config.dart”，找到Config，修改其参数如下：</span>
            <el-divider></el-divider>
            <h4>sdkappid</h4>
            <el-divider></el-divider>
            <div>你的SDKAppID</div>
            <el-divider></el-divider>
            <h4>key</h4>
            <el-divider></el-divider>
            <div>你的密钥</div>
            <el-divider></el-divider>
        </div>
        <el-divider></el-divider>
        <div>
            <h2>恭喜！你完成了所有开发者部署的步骤</h2>
            <el-divider></el-divider>
            <span>请移步“项目部署 · 用户”</span>
        </div>
        <el-divider></el-divider>
    </div>
</template>

<script>
export default {
    name: '404',
    data() {
        return {
           
        };
    }
};
</script>