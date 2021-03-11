<template>
    <div class="spin"></div>
</template>

<style>
.spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 40px;
    height: 40px;
    border: 5px solid transparent;
    border-radius: 50%;
    border-top-color: #1282a2;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    to {
        -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
    }
}
</style>
