<template>
  <div>
    <v-row>
      <v-col cols="5"></v-col>
      <v-col cols="2">
        <v-btn v-if="isImage" @click="encryptOtpPic()">Bild mit 2 Folien verschlüsseln</v-btn>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <div v-if="isEncrypted">
      <br />
    </div>
    <v-container v-if="isImage" fill-height fluid>
      <v-row v-if="isEncrypted">
        <v-col cols="2"></v-col>
        <v-col align="center" cols="8">
          <v-card class="py-5">
            <div>Folie 1:</div>
            <br/>
            <v-img max-width="1000" max-height="1000" :src="share1.src"></v-img>
            <br/>
            <div>Folie 2:</div>
            <br/>
            <v-img max-width="1000" max-height="1000" :src="share2.src"></v-img>
          </v-card>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>
    <br/>
    <canvas id="share" width="0" height="0"></canvas>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import store from "@/store/store";

export default {
  name: 'EncryptOneTimePad',
  data() {
    return {
      darkImage: "",
      darkImgData: [],
      share1: "",
      share1imgData: [],
      share2: "",
      share2imgData: [],
      download: true,
      isImage: false,
      isEncrypted: false,
      loaded: false,
      noImage: false,
      error: false,
      canvasShare: "",
      ctxShare: "",
      share1Data: "",
      share2Data: ""
    }
  },
  computed: {
    ...mapGetters(['cShare1', 'cShare2', 'cBlackWhiteImage', 'cBlackWhiteImageData'])
  },
  watch: {
    cBlackWhiteImage() {
      if (this.cBlackWhiteImage !== "" && this.cBlackWhiteImageData !== []) {
        this.download = true
        this.darkImage = this.cBlackWhiteImage
        this.darkImgData = this.cBlackWhiteImageData
      }
    },
    cBlackWhiteImageData() {
      this.bigDarkImgData = this.cBlackWhiteImageData
      if (this.cBlackWhiteImageData !== []) this.isImage = true
      else this.isImage = false
    },
    cShare1() {
      this.share1 = this.cShare1
      if (this.share1 === "") {
        this.canvasShare.width = 0
        this.canvasShare.height = 0
        this.isEncrypted = false
      }
    },
    cShare2() {
      this.share2 = this.cShare2
      if (this.share2 === "") {
        this.canvasShare.width = 0
        this.canvasShare.height = 0
        this.isEncrypted = false
      }
    }
  },
  mounted() {
    this.canvasShare = document.getElementById("share")
    this.ctxShare = this.canvasShare.getContext("2d")
  },
  methods: {
    ...mapMutations(['updateShare1', 'updateShare1ImageData', 'updateShare2', 'updateShare2ImageData']),
    encryptOtpPic() {
      this.download = true
      this.canvasShare.width = this.darkImage.width
      this.canvasShare.height = this.darkImage.height
      const firstImgData = this.ctxShare.getImageData(0, 0, this.canvasShare.width, this.canvasShare.height)
      const secondImgData = this.ctxShare.getImageData(0, 0, this.canvasShare.width, this.canvasShare.height)

      let originalBlack = false

      for (let i = 0; i < this.darkImgData.data.length - 4; i += 4) {

        if (this.darkImgData.data[i] === 0) originalBlack = true
        else originalBlack = false

        let random = 0
        random = Math.floor(Math.random() * 2)
        if (random === 0) {
          //share1 = 0
          //share2 = 0 falls weiß
          //share2 = 255 falls schwarz

          //share1 → schwarz
          firstImgData.data[i] = 0
          firstImgData.data[i + 1] = 0
          firstImgData.data[i + 2] = 0
          firstImgData.data[i + 3] = 255

          if (originalBlack) {
            //share2 muss weiß sein
            secondImgData.data[i] = 255
            secondImgData.data[i + 1] = 255
            secondImgData.data[i + 2] = 255
            secondImgData.data[i + 3] = 255
          } else {
            //share2 muss schwarz sein
            secondImgData.data[i] = 0
            secondImgData.data[i + 1] = 0
            secondImgData.data[i + 2] = 0
            secondImgData.data[i + 3] = 255
          }
        } else {
          //share1 = 255
          //share2 = 255 falls weiß
          //share2 = 0 falls schwarz

          //share1 → weiß
          firstImgData.data[i] = 255
          firstImgData.data[i + 1] = 255
          firstImgData.data[i + 2] = 255
          firstImgData.data[i + 3] = 255

          if (originalBlack) {
            //share2 muss schwarz sein
            secondImgData.data[i] = 0
            secondImgData.data[i + 1] = 0
            secondImgData.data[i + 2] = 0
            secondImgData.data[i + 3] = 255
          } else {
            //share2 muss weiß sein
            secondImgData.data[i] = 255
            secondImgData.data[i + 1] = 255
            secondImgData.data[i + 2] = 255
            secondImgData.data[i + 3] = 255
          }
        }
      }

      this.share1 = new Image(this.darkImage.width, this.darkImage.height)
      this.share2 = new Image(this.darkImage.width, this.darkImage.height)
      this.share1.data = firstImgData
      this.share2.data = secondImgData

      if (this.download) {
        this.ctxShare.putImageData(firstImgData, 0, 0)
        this.ctxShare.drawImage(this.share1, 0, 0)
        this.share1.src = window.location.href = this.canvasShare.toDataURL("image/png").replace("image/png", "image/octet-stream")
        this.ctxShare.putImageData(secondImgData, 0, 0)
        this.ctxShare.drawImage(this.share2, 0, 0)
        this.share2.src = window.location.href = this.canvasShare.toDataURL("image/png").replace("image/png", "image/octet-stream")
        this.download = false
      }
      store.commit('updateShare1', this.share1)
      store.commit('updateShare2', this.share2)
      store.commit('updateShare1ImageData', firstImgData)
      store.commit('updateShare2ImageData', secondImgData)

      this.isEncrypted = true
      this.canvasShare.width = 0
      this.canvasShare.height = 0

      if (this.share1 !== "" && this.share2 !== "") this.getOtpShareData(firstImgData, secondImgData)
    },
    getOtpShareData(firstImgData, secondImgData) {
      this.canvasShare.width = this.share1.width
      this.canvasShare.height = this.share1.height

      let imgData1 = this.ctxShare.getImageData(0, 0, this.canvasShare.width, this.canvasShare.height)
      let imgData2 = this.ctxShare.getImageData(0, 0, this.canvasShare.width, this.canvasShare.height)

      this.share1Data = new Image(this.share1.width, this.share1.height)
      this.share2Data = new Image(this.share2.width, this.share2.height)

      for (let i = 0; i < firstImgData.data.length; i += 4) {
        if (firstImgData.data[i] === 255) imgData1.data[i + 3] = 0
        else if (firstImgData.data[i] === 0) imgData1.data[i + 3] = 255
        imgData1.data[i] = firstImgData.data[i]
        imgData1.data[i + 1] = firstImgData.data[i + 1]
        imgData1.data[i + 2] = firstImgData.data[i + 2]

        if (secondImgData.data[i] === 255) imgData2.data[i + 3] = 0
        else if (secondImgData.data[i] === 0) imgData2.data[i + 3] = 255
        imgData2.data[i] = secondImgData.data[i]
        imgData2.data[i + 1] = secondImgData.data[i + 1]
        imgData2.data[i + 2] = secondImgData.data[i + 2]
      }

      this.share1Data.data = imgData1
      this.share2Data.data = imgData2

      this.ctxShare.putImageData(imgData1, 0, 0)
      this.share1Data.src = window.location.href = this.canvasShare.toDataURL("image/png").replace("image/png", "image/octet-stream")
      this.ctxShare.putImageData(imgData2, 0, 0)
      this.share2Data.src = window.location.href = this.canvasShare.toDataURL("image/png").replace("image/png", "image/octet-stream")
      this.canvasShare.width = 0
      this.canvasShare.height = 0
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
