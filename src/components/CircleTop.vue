<template>
    <div class="circle-top"></div>
</template>

<script>
export default {};
</script>

<style>
.circle-top {
    width: 96vw;
    height: 96vw;
    border-radius: 50%;
    transform: translate(-50%, -36%);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
    background-color: #1282a2;
    transition: 0.5s;
}

@media (min-width: 1025px) and (orientation: landscape) {
    .circle-top {
        width: 360px;
        height: 360px;
    }
}
</style>
