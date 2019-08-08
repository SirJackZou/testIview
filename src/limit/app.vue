<template>
    <div>
        <div id="particles-js"></div>
        <Row style="position:absolute;top:250px;left:0;right:0">
            <Col span="14" offset="5">
            <Alert show-icon>
                <template slot="desc">
                    <p style="fontSize:16px;">抱歉，您暂时无权访问数据服务中心平台，如须开通权限，请邮件联系
                        <b>wangweijie8@jd.com,</b>谢谢！</p>
                </template>
            </Alert>
            </Col>
        </Row>
    </div>
</template>
<script>
import 'particles.js/particles.js';
import particlesOptions from '../libs/particles';

export default {
    name: 'app',
    data() {
        return {
            //
        };
    },
    methods: {},
    computed: {},
    mounted() {
        particlesJS('particles-js', particlesOptions);
    }
};
</script>

<style lang="less" scoped>
/* ---- particles.js container ---- */

#particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #323840;
    background-image: url('');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
}

/* ---- stats.js ---- */

.count-particles {
    background: #000022;
    position: absolute;
    top: 48px;
    left: 0;
    width: 80px;
    color: #13e8e9;
    font-size: 0.8em;
    text-align: left;
    text-indent: 4px;
    line-height: 14px;
    padding-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
}

.js-count-particles {
    font-size: 1.1em;
}

#stats,
.count-particles {
    -webkit-user-select: none;
}

#stats {
    border-radius: 3px 3px 0 0;
    overflow: hidden;
}

.count-particles {
    border-radius: 0 0 3px 3px;
}
</style>
