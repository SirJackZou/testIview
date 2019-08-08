<template>
    <div>
        <Row>
            <Spin size="large" fix v-if="bSpinShow"></Spin>
            <Table :size="size||'small'" :border="border" :height="height" :stripe="stripe=='hidden'?false:true" :columns="columns" :data="data" @on-selection-change="selectChange" :width='width'></Table>
            <Row v-if="pagination" type="flex" justify="end" :style="{marginTop:'5px',marginBottom:'5px',marginRight:'5px'}">
                <Col>
                <Page size="small" :pageSize="pagination.pageSize" :total="pagination.total" :current="pagination.currentPage" show-total show-sizer show-elevator @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10, 50, 100]"></Page>
                </Col>
            </Row>
        </Row>
    </div>
</template>
<script>
export default {
    props: [
        'columns',
        'data',
        'pagination',
        'bSpinShow',
        'size',
        'stripe',
        'border',
        'width',
        'height',
    ],
    data() {
        return {};
    },
    methods: {
        // 分页切换
        changePage(page) {
            this.$emit('changePage', page);
        },
        // 页码数切换
        changePageSize(pagesize) {
            this.$emit('changePageSize', pagesize);
        },
        // 多选
        selectChange(selection) {
            this.$emit('selectChange', selection);
        },
    },
    mounted() {},
};
</script>