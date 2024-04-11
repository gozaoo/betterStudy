<template>
    <div class="row">
        <div class="scrollbar">
        <slot />

        </div>
    </div>
</template>
<style scoped>
    .row{
        background: var(--cardBackgroundImage);
        box-shadow: 0 0 1em #0001;
        height: fit-content;
        border-radius: 1em;
        box-sizing: border-box;
        cursor: text;
        flex-direction: row;
        max-height: 250px;
        overflow: hidden;
    }
    .scrollbar{
        overflow: auto;
        max-height: 250px;
        padding: 12px;
    }
    /* 修改整个滚动条的样式 */
::-webkit-scrollbar {
    width: 12px; /* 设置滚动条的宽度 */
    padding: 1em 0.2em;

}

/* 修改滚动轨迹的样式 */
::-webkit-scrollbar-track {
    padding: 1em 0.2em;
    background: #0000; /* 设置滚动轨迹的背景颜色 */
}

/* 修改滚动滑块的样式 */
::-webkit-scrollbar-thumb {
    background: #999; /* 设置滚动滑块的背景颜色 */
}

/* 当鼠标悬停在滚动滑块上时的样式 */
::-webkit-scrollbar-thumb:hover {
}

</style>