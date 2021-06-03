<template>
    <div>
        <div>
            <h2>云函数部署</h2>
            <el-divider></el-divider>
            <h3>写在前面</h3>
            <el-divider></el-divider>
            <span>还请诸位读者忍耐下本页的无缩进代码，作者没有找到让他按照粘贴的格式进行换行/缩进的方法，敲了248个 br 手都废了，着实没有心力去敲缩进了QWQ</span> 
            <el-divider></el-divider>
            <ul>
                <li>点击 云函数 进入云函数管理界面</li>
                <li>点击“新建云函数”新建云函数login</li>
                <li>输入云函数名称login，点击下一步、确定</li>
                <li>点击云函数名称进入云函数详情界面，点击“函数代码”</li>
                <li>编辑函数代码为：</li>
            </ul>
            <el-divider></el-divider>
            <el-card>
                <div>
                    'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var val = '';<br>
    await db.collection('userList').where({<br>
        'userId': event.userId<br>
    }).get()<br>
    .then((value) => {<br>
        val = value;<br>
    });<br>
<br>
    if (val.data.length == 0) {<br>
        await db.collection('userList').add({<br>
            'userId': event.userId,<br>
            'password': event.password,<br>
            'privateKey': event.privateKey<br>
        })<br>
        .then((value) => {<br>
            val = value;<br>
        })<br>
    }<br>
<br>
    return val.data;<br>
};<br>
                </div>
            </el-card>
        <el-divider></el-divider>
            <ul>
                <li>点击“保存并安装依赖”</li>
                <li>按照网页提示新建package.json文件并编辑</li>
                <li>点击“保存并安装依赖”</li>
            </ul>
        </div>
        <el-divider></el-divider>
        <div>
                <span>如此往复，新建另外几个云函数，余下云函数及其代码如下：</span>
        </div>
        <el-divider></el-divider>
        <div>
            <span>getWorkOfUser</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var _ = db.command;<br>
    var val = '';<br>
<br>
    await db.collection('workList').where({<br>
      'createrId': event.userId<br>
    }).get()<br>
        .then((value) => {<br>
            val = value;<br>
    });<br>
    return val.data;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>deleteWork</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var _ = db.command;<br>
    var val = 0;<br>
<br>
    await db.collection('workList')<br>
    .where({<br>
        'workId': event.workId<br>
    })<br>
    .remove();<br>
<br>
    await db.collection('commits_of_work')<br>
    .where({<br>
        'workId': event.workId<br>
    })<br>
    .get()<br>
    .then((value) => {<br>
        val = value.data[0].commits<br>
    });<br>
<br>
    await db.collection('commits_of_work').where({<br>
        'workId': event.workId<br>
    })<br>
    .remove();<br>
<br>
    await db.collection('commitList').where({<br>
        'commitId': _.in(val)<br>
    })<br>
    .remove()<br>
    .then((value) => {<br>
        val = value;<br>
    });<br>
<br>
    return val.data;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>addCommit</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var _ = db.command;<br>
    var val = 0;<br>
<br>
    await db.collection('commitList')<br>
    .add({<br>
        'userId': event.userId,<br>
        'commitId': event.commitId,<br>
        'content': event.content,<br>
        'createTime': new Date(),<br>
        'score': event.score<br>
    });<br>
<br>
    await db.collection('commits_of_work').where({<br>
        'workId': event.workId<br>
    }).update({<br>
        'commits': _.push(event.commitId)<br>
    }).then((res) => {<br>
        val = res;<br>
    });<br>
    <br>
    await db.collection('workList').where({<br>
        'workId': event.workId<br>
    }).get()<br>
    .then((res) => {<br>
        val = res.data[0].scoreArray;<br>
        val[event.score] += 1;<br>
    });<br>
<br>
    await db.collection('workList').where({<br>
        'workId': event.workId<br>
    }).update({<br>
        'scoreArray': val<br>
    }).then((res) => {<br>
        val = res;<br>
    });<br>
<br>
    await db.collection('idCounter')<br>
    .doc('你的idCounter中文档的_id')<br>
    .update({<br>
        commitCount: _.inc(1)<br>
    })<br>
        .then((value) => {<br>
            val = value;<br>
    });<br>
    return val;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>getCommitCount</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var val = '';<br>
    await db.collection('idCounter')<br>
    .get()<br>
        .then((value) => {<br>
            val = value.data[0].commitCount;<br>
    });<br>
    return val;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>getCommitList</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var _ = db.command;<br>
    var val = '';<br>
    await db.collection('commits_of_work').where({<br>
        'workId': event.workId<br>
    }).get()<br>
        .then((value) => {<br>
            val = value;<br>
    });<br>
    let result = val.data[0]['commits'];<br>
    await db.collection('commitList').where({<br>
      'commitId': _.in(result)<br>
    }).get()<br>
        .then((value) => {<br>
            val = value;<br>
    });<br>
    return val.data;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>addWork</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var _ = db.command;<br>
    var val = 0;<br>
<br>
    await db.collection('workList')<br>
    .add({<br>
        'createrId': event.userId,<br>
        'scoreArray': [0, 0, 0, 0, 0],<br>
        'workCover': event.workCover,<br>
        'workId': event.workId,<br>
        'workName': event.workName,<br>
        'type': event.type<br>
    });<br>
<br>
    await db.collection('commits_of_work')<br>
    .add({<br>
        'workId': event.workId,<br>
        'commits': []<br>
    });<br>
<br>
    await db.collection('idCounter')<br>
    .doc('你的idCounter中文档的_id')<br>
    .update({<br>
        workCount: _.inc(1)<br>
    })<br>
        .then((value) => {<br>
            val = value;<br>
    });<br>
<br>
    return val.data;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>getWorkCount</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var val = '';<br>
    await db.collection('idCounter')<br>
    .get()<br>
        .then((value) => {<br>
            val = value.data[0].workCount;<br>
    });<br>
    return val;<br>
};<br>
</div></el-card>
        </div>
        <el-divider></el-divider>
        <div>
            <span>getWorkList</span>
        <el-divider></el-divider>
            <el-card><div>'use strict';<br>
const cloudbase = require("@cloudbase/node-sdk");<br>
const app = cloudbase.init({<br>
  env: "你的环境id"<br>
});<br>
const db = app.database();<br>
exports.main = async (event, context) => {<br>
    var _ = db.command;<br>
    var val = '';<br>
<br>
    await db.collection('workList').where({<br>
      'type': event.type<br>
    }).get()<br>
        .then((value) => {<br>
            val = value;<br>
    });<br>
    return val.data;<br>
};<br>
</div></el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tabs',
    data() {
        return {
           
        };
    }
};
</script>