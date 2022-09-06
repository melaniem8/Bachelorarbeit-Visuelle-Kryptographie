<template>
  <div>
    <v-row>
      <v-col cols="5"></v-col>
      <v-col cols="2">
        <v-btn v-if="isEncrypted" @click="decryptOtpPic()">Bilder entschlüsseln</v-btn>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <div v-if="isEncrypted">
      <br />
    </div>
    <v-container v-if="isDecrypted" fill-height fluid>
      <v-row v-if="isDecrypted">
        <v-col cols="2"></v-col>
        <v-col align="center" cols="8">
          <v-card class="py-5">
            <div>Entschlüsseltes Bild:</div>
            <br/>
            <v-img max-width="1000" max-height="1000" :src="decryptedImage.src"></v-img>
          </v-card>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>
    <br/>
    <canvas id="decrypted" width="0" height="0"></canvas>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import store from "@/store/store";

export default {
  name: 'DecryptOtp',
  data() {
    return {
      share1: "",
      share1ImgData: [],
      share2: "",
      share2ImageData: [],
      download: true,
      isImage: false,
      isEncrypted: false,
      isDecrypted: false,
      decryptedImage: "",
      canvasDecrypted: "",
      ctxDecrypted: ""
    }
  },
  computed: {
    ...mapGetters(['cShare1', 'cShare1ImageData', 'cShare2', 'cShare2ImageData'])
  },
  watch: {
    cShare1() {
      this.decryptedImage = ""
      this.share1 = this.cShare1
      if (this.share1 === "") {
        this.canvasDecrypted.width = 0
        this.canvasDecrypted.height = 0
        this.isEncrypted = false
        this.isDecrypted = false
      }
    },
    cShare2() {
      this.share2 = this.cShare2
      if (this.share2 === "") {
        this.canvasDecrypted.width = 0
        this.canvasDecrypted.height = 0
        this.isEncrypted = false
        this.isDecrypted = false
      } else if(this.share1 !== "") {
        this.isEncrypted = true
        this.isDecrypted = false
      }
    },
    cShare1ImageData() {
      this.share1ImgData = this.cShare1ImageData
    },
    cShare2ImageData() {
      this.share2ImageData = this.cShare2ImageData
    }
  },
  mounted() {
    this.canvasDecrypted = document.getElementById("decrypted")
    this.ctxDecrypted = this.canvasDecrypted.getContext("2d")
  },
  methods: {
    ...mapMutations(['updateOtpDecrypted']),
    decryptOtpPic() {
      this.download = true
      this.decryptedImage = new Image(this.share1.width, this.share1.height)

      this.canvasDecrypted.width = this.cShare1.width
      this.canvasDecrypted.height = this.cShare1.height
      const decImgData = this.ctxDecrypted.getImageData(0, 0, this.canvasDecrypted.width, this.canvasDecrypted.height)

      for(let i = 0; i < decImgData.data.length; i++) {
        if((i + 1) % 4 === 0) decImgData.data[i] = 255
        else if(this.share1ImgData.data[i] === 255 && this.share2ImageData.data[i] === 255) decImgData.data[i] = 255
        else if(this.share1ImgData.data[i] === 0 && this.share2ImageData.data[i] === 0) decImgData.data[i] = 255
        else decImgData.data[i] = 0
      }

      if (this.download) {
        this.ctxDecrypted.putImageData(decImgData, 0, 0)
        this.ctxDecrypted.drawImage(this.decryptedImage, 0, 0)
        this.decryptedImage.src = window.location.href = this.canvasDecrypted.toDataURL("image/png").replace("image/png", "image/octet-stream")
        this.download = false
      }
      store.commit('updateOtpDecrypted', this.decryptedImage)

      this.isDecrypted = true
      this.canvasDecrypted.width = 0
      this.canvasDecrypted.height = 0
    }
  }
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
