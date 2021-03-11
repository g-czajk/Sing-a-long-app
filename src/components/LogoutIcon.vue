<template>
    <div class="logout">
        <font-awesome-icon :icon="['fas', 'power-off']" />
    </div>
</template>

<script>
export default {};
</script>

<style>
.logout {
    position: absolute;
    top: 4vw;
    right: 4vw;
    color: #034078;
    font-size: 24px;
}

@media (min-width: 1025px) and (orientation: landscape) {
    .logout {
        top: 15px;
        right: 15px;
        cursor: pointer;
    }
}
</style>
