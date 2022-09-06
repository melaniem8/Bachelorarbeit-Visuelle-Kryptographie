<template>
  <div>
    <v-container v-if="isDarkImage" fill-height fluid>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col align="center" cols="8">
          <v-card class="py-5">
            <div>Schwarzweißbild:</div>
            <br/>
            <v-img style="align-items: center;" max-width="1000" max-height="1000" :src="darkImage.src"
                   alt="Bilddatei beschädigt (lässt sich nicht öffnen!)" v-on:error="imgError"/>
          </v-card>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>
    <canvas id="blackWhite" width="0" height="0"></canvas>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import store from "@/store/store";

export default {
  name: 'BlackWhiteImage',
  data() {
    return {
      download: true,
      isDarkImage: false,
      darkImage: "",
      darkImgData: []
    }
  },
  mounted() {
    this.canvasBlackWhite = document.getElementById("blackWhite")
    this.ctxBlackWhite = this.canvasBlackWhite.getContext("2d")
  },
  computed: {
    ...mapGetters(['cImage'])
  },
  watch: {
    cImage() {
      this.download = true
      this.darkImage = this.cImage
      this.getBlackWhiteImage()
    }
  },
  methods: {
    ...mapMutations(['updateBlackWhiteImage', 'updateBlackWhiteImageData', 'updateBigBlackWhiteImage', 'updateBigBlackWhiteImageData', 'updateShare1', 'updateShare2']),
    imgError() {
      this.isDarkImage = false
      this.error = true
      this.download = true
      this.setImagesInStore()
    },
    getBlackWhiteImage() {
      if (this.darkImage !== "") {
        this.canvasBlackWhite.width = this.cImage.width
        this.canvasBlackWhite.height = this.cImage.height
        this.darkImage.crossOrigin = "anonymous"
        this.ctxBlackWhite.drawImage(this.darkImage, 0, 0)
        const imgData = this.ctxBlackWhite.getImageData(0, 0, this.canvasBlackWhite.width, this.canvasBlackWhite.height)
        this.darkImgData = this.getBlackWhite(imgData)
        this.ctxBlackWhite.putImageData(this.darkImgData, 0, 0)

        if (this.download) {
          this.darkImage.src = window.location.href = this.canvasBlackWhite.toDataURL("image/png").replace("image/png", "image/octet-stream")
          this.download = false
        }
        this.setImagesInStore()

        this.isDarkImage = true
        this.canvasBlackWhite.width = 0
        this.canvasBlackWhite.height = 0
      } else {
        this.isDarkImage = false
        alert("Kein Bild geladen!")
      }
    },
    getBlackWhite(imgData) {
      for (let i = 0; i < imgData.data.length; i += 4) {
        let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]
        let colour = 0
        if (count > 510) colour = 255
        imgData.data[i] = colour
        imgData.data[i + 1] = colour
        imgData.data[i + 2] = colour
        imgData.data[i + 3] = 255
      }
      return imgData
    },
    setImagesInStore() {
      store.commit('updateBlackWhiteImage', this.darkImage)
      store.commit('updateBlackWhiteImageData', this.darkImgData)
      store.commit('updateBigBlackWhiteImage', "")
      store.commit('updateBigBlackWhiteImageData', "")
      store.commit('updateShare1', "")
      store.commit('updateShare2', "")
    }
  }
}
</script>

<style></style>
