<template>
  <div>
    <v-row>
      <v-col cols="5"></v-col>
      <v-col cols="2">
        <v-btn v-if="isImage" @click="encryptClassicPic()">Bild mit 2 Folien verschlüsseln</v-btn>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <div v-if="isEncrypted">
      <br/>
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
  name: 'EncryptClassic',
  data() {
    return {
      bigDarkImage: "",
      bigDarkImgData: [],
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
      share2Data: "",
      eins: "",
      zwei: ""
    }
  },
  computed: {
    ...mapGetters(['cShare1', 'cShare2', 'cBigBlackWhiteImage', 'cBigBlackWhiteImageData'])
  },
  watch: {
    cBigBlackWhiteImage() {
      this.bigDarkImage = this.cBigBlackWhiteImage
      if (this.cBigBlackWhiteImage !== "") this.isImage = true
      else this.isImage = false
      this.canvasShare.width = 0
      this.canvasShare.height = 0
    },
    cBigBlackWhiteImageData() {
      this.bigDarkImgData = this.cBigBlackWhiteImageData
      if (this.cBigBlackWhiteImageData !== []) this.isImage = true
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
    encryptClassicPic() {
      this.download = true
      let bigWidth = this.bigDarkImage.width
      let bigHeight = this.bigDarkImage.height

      this.canvasShare.width = bigWidth
      this.canvasShare.height = bigHeight
      const firstImgData = this.ctxShare.getImageData(0, 0, this.canvasShare.width, this.canvasShare.height)
      const secondImgData = this.ctxShare.getImageData(0, 0, this.canvasShare.width, this.canvasShare.height)

      //Erste Folie share1 zufällig mit 0/1 füllen und zweite Folie share2 entsprechend füllen
      let originalBlack = false

      for (let i = 0; i < this.bigDarkImgData.data.length - 8; i += 8) {
        //Es werden grundsätzlich immer 2 Reihen betrachtet

        if (this.bigDarkImgData.data[i] === 0) originalBlack = true
        else originalBlack = false

        let random = 0
        random = Math.floor(Math.random() * 2)
        if (random === 0) {
          //share1 = (1,0,0,1), also (0,255,255,0)
          //share2 = (1,0,0,1) falls weiß, also (0,255,255,0)
          //share2 = (0,1,1,0) falls schwarz, also (255,0,0,255)

          if (i % 2 * bigWidth < bigWidth) {
            //share1 → die erste Zeile ändern
            firstImgData.data[i] = 0
            firstImgData.data[i + 1] = 0
            firstImgData.data[i + 2] = 0
            firstImgData.data[i + 3] = 255
            firstImgData.data[i + 4] = 255
            firstImgData.data[i + 5] = 255
            firstImgData.data[i + 6] = 255
            firstImgData.data[i + 7] = 255

            //share2 → die erste Zeile ändern
            if (originalBlack) {
              //Fall (1,0), also ist share1 (0,255) und share2 ist (255,0)
              secondImgData.data[i] = 255
              secondImgData.data[i + 1] = 255
              secondImgData.data[i + 2] = 255
              secondImgData.data[i + 3] = 255
              secondImgData.data[i + 4] = 0
              secondImgData.data[i + 5] = 0
              secondImgData.data[i + 6] = 0
              secondImgData.data[i + 7] = 255
            } else {
              //weißes Pixel
              //Fall (1,0), also ist share1 (0,255) und share2 ist (0,255)
              secondImgData.data[i] = 0
              secondImgData.data[i + 1] = 0
              secondImgData.data[i + 2] = 0
              secondImgData.data[i + 3] = 255
              secondImgData.data[i + 4] = 255
              secondImgData.data[i + 5] = 255
              secondImgData.data[i + 6] = 255
              secondImgData.data[i + 7] = 255
            }
          } else {
            //share1 → die zweite Zeile ändern
            //Kombi 0,1 → also share 1 muss 1,0 sein (0, 255)
            firstImgData.data[i] = 255
            firstImgData.data[i + 1] = 255
            firstImgData.data[i + 2] = 255
            firstImgData.data[i + 3] = 255
            firstImgData.data[i + 4] = 0
            firstImgData.data[i + 5] = 0
            firstImgData.data[i + 6] = 0
            firstImgData.data[i + 7] = 255
            //share2 → die zweite Zeile ändern
            if (originalBlack) {
              //Fall (0,1), also (0, 255) -> share2 muss (255,0) sein
              secondImgData.data[i] = 0
              secondImgData.data[i + 1] = 0
              secondImgData.data[i + 2] = 0
              secondImgData.data[i + 3] = 255
              secondImgData.data[i + 4] = 255
              secondImgData.data[i + 5] = 255
              secondImgData.data[i + 6] = 255
              secondImgData.data[i + 7] = 255
            } else {
              //weißes Pixel
              //Fall (0,1), also (0,255) schwarz weiß -> share2 muss (0,255) sein
              secondImgData.data[i] = 255
              secondImgData.data[i + 1] = 255
              secondImgData.data[i + 2] = 255
              secondImgData.data[i + 3] = 255
              secondImgData.data[i + 4] = 0
              secondImgData.data[i + 5] = 0
              secondImgData.data[i + 6] = 0
              secondImgData.data[i + 7] = 255
            }
          }
        } else {
          //share1 = (0,1,1,0)
          //share2 = (0,1,1,0) falls weiß
          //share2 = (1,0,0,1) falls schwarz

          //share1 → die erste Zeile ändern
          //share1 muss (0,1) sein, also (255,0)
          firstImgData.data[i] = 255
          firstImgData.data[i + 1] = 255
          firstImgData.data[i + 2] = 255
          firstImgData.data[i + 3] = 255
          firstImgData.data[i + 4] = 0
          firstImgData.data[i + 5] = 0
          firstImgData.data[i + 6] = 0
          firstImgData.data[i + 7] = 255

          //share2 → die erste Zeile ändern
          if (originalBlack) {
            //share2 muss (1,0) sein, also (0,255)
            secondImgData.data[i] = 0
            secondImgData.data[i + 1] = 0
            secondImgData.data[i + 2] = 0
            secondImgData.data[i + 3] = 255
            secondImgData.data[i + 4] = 255
            secondImgData.data[i + 5] = 255
            secondImgData.data[i + 6] = 255
            secondImgData.data[i + 7] = 255
          } else {
            //weißes Pixel
            //share2 muss (0,1) sein, also (255,0)
            secondImgData.data[i] = 255
            secondImgData.data[i + 1] = 255
            secondImgData.data[i + 2] = 255
            secondImgData.data[i + 3] = 255
            secondImgData.data[i + 4] = 0
            secondImgData.data[i + 5] = 0
            secondImgData.data[i + 6] = 0
            secondImgData.data[i + 7] = 255
          }
        }
      }

      this.share1 = new Image(bigWidth, bigHeight)
      this.share2 = new Image(bigWidth, bigHeight)
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

      if (this.share1 !== "" && this.share2 !== "") this.getShareData(firstImgData, secondImgData)
    },
    getShareData(firstImgData, secondImgData) {
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
