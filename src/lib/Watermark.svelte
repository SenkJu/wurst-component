<script lang="ts">
    import logo from "../assets/wurst_128.png";
</script>

<div class="watermark">
    <img class="logo" src={logo} alt="logo" />
    <div class="version">v7.41.1 MC 1.20.4</div>
</div>

<style lang="scss">
    .watermark {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-size: 20px;
        padding-right: 5px;
        background-color: rgba(white, 0.5);
        height: 22px;

        position: fixed;
        left: 0;
        top: 12px;

        .logo {
            height: 35px;
        }
    }
</style>
