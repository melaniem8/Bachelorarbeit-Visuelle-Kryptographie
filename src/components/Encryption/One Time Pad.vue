<template>
  <div>
    <pick-image></pick-image>
    <BlackWhiteImage></BlackWhiteImage>
    <EncryptOneTimePad></EncryptOneTimePad>
    <DecryptOtp></DecryptOtp>
  </div>
</template>

<script>
import PickImage from "@/components/Pick Image/Pick Image";
import BlackWhiteImage from "@/components/Change to Black and White Image/Black White Image";
import EncryptOneTimePad from "@/components/Encryption/EncryptOneTimePad";
import DecryptOtp from "@/components/Decryption/DecryptOneTimePad";

export default {
  name: 'VisualCryptography',
  components: {DecryptOtp, EncryptOneTimePad, BlackWhiteImage, PickImage},
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
