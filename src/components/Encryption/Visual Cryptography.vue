<template>
  <div>
    <pick-image></pick-image>
    <BlackWhiteImage></BlackWhiteImage>
    <BigBlackWhiteImage></BigBlackWhiteImage>
    <EncryptClassic></EncryptClassic>
    <DecryptClassic></DecryptClassic>
  </div>
</template>

<script>
import PickImage from "@/components/Pick Image/Pick Image";
import BlackWhiteImage from "@/components/Change to Black and White Image/Black White Image";
import BigBlackWhiteImage from "@/components/Change to Black and White Image/Big Black White Image";
import EncryptClassic from "@/components/Encryption/EncryptClassic";
import DecryptClassic from "@/components/Decryption/DecryptClassic";

export default {
  name: 'VisualCryptography',
  components: {DecryptClassic, EncryptClassic, BigBlackWhiteImage, BlackWhiteImage, PickImage},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
