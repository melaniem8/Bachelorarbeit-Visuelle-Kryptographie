<template>
  <div>
    <canvas id="bigBlackWhite" width="0" height="0"></canvas>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import store from "@/store/store";

export default {
  name: 'BigBlackWhiteImage',
  data() {
    return {
      download: true,
      isImage: false,
      darkImage: "",
      darkImgData: [],
      bigDarkImage: "",
      bigDarkImgData: []
    }
  },
  mounted() {
    this.canvasBigBlackWhite = document.getElementById("bigBlackWhite")
    this.ctxBigBlackWhite = this.canvasBigBlackWhite.getContext("2d")
  },
  computed: {
    ...mapGetters(['cBlackWhiteImage', 'cBlackWhiteImageData'])
  },
  watch: {
    cBlackWhiteImage() {
      if(this.cBlackWhiteImage !== "" && this.cBlackWhiteImageData !== []) {
        this.download = true
        this.darkImage = this.cBlackWhiteImage
        this.darkImgData = this.cBlackWhiteImageData
        this.setImagesInStore()
        this.getBigBlackWhiteImage()
      }
    }
  },
  methods: {
    ...mapMutations(['updateBigBlackWhiteImage', 'updateBigBlackWhiteImageData']),
    getBigBlackWhiteImage() {
      if(this.darkImage === "") this.isImage = false
      else {
        this.bigDarkImage = new Image(this.darkImage.width * 2, this.darkImage.height * 2)
        this.canvasBigBlackWhite.width = this.darkImage.width * 2
        this.canvasBigBlackWhite.height = this.darkImage.height * 2
        let newData = new Uint8ClampedArray(this.darkImgData.data.length * 2)
        let bigData = new Uint8ClampedArray(newData.length * 2)
        let newIndex = 0

        for (let i = 0; i < this.darkImgData.data.length; i += 4) {
          newIndex = i * 2
          newData[newIndex] = this.darkImgData.data[i]
          newData[newIndex + 1] = this.darkImgData.data[i + 1]
          newData[newIndex + 2] = this.darkImgData.data[i + 2]
          newData[newIndex + 3] = this.darkImgData.data[i + 3]
          newData[newIndex + 4] = this.darkImgData.data[i]
          newData[newIndex + 5] = this.darkImgData.data[i + 1]
          newData[newIndex + 6] = this.darkImgData.data[i + 2]
          newData[newIndex + 7] = this.darkImgData.data[i + 3]
        }

        let row = 0
        for (let i = 0; i < this.darkImgData.data.length * 2; i += 4) {
          let col = i % (this.bigDarkImage.width * 4)
          if (col === 0) row = 2 * i
          bigData[row + col] = newData[i]
          bigData[row + col + 1] = newData[i + 1]
          bigData[row + col + 2] = newData[i + 2]
          bigData[row + col + 3] = newData[i + 3]
          bigData[row + col + this.bigDarkImage.width * 4] = newData[i]
          bigData[row + col + this.bigDarkImage.width * 4 + 1] = newData[i + 1]
          bigData[row + col + this.bigDarkImage.width * 4 + 2] = newData[i + 2]
          bigData[row + col + this.bigDarkImage.width * 4 + 3] = newData[i + 3]
        }

        this.bigDarkImgData = new ImageData(bigData, this.bigDarkImage.width)
        this.bigDarkImage.crossOrigin = "anonymous"
        this.ctxBigBlackWhite.drawImage(this.bigDarkImage, 0, 0, this.canvasBigBlackWhite.width, this.canvasBigBlackWhite.height)
        this.ctxBigBlackWhite.putImageData(this.bigDarkImgData, 0, 0)

        if (this.download) {
          this.bigDarkImage.src = window.location.href = this.canvasBigBlackWhite.toDataURL("image/png").replace("image/png", "image/octet-stream")
          this.download = false
        }
        this.setImagesInStore()

        this.canvasBigBlackWhite.width = 0
        this.canvasBigBlackWhite.height = 0
      }
    },
    setImagesInStore() {
      store.commit('updateBigBlackWhiteImage', this.bigDarkImage)
      store.commit('updateBigBlackWhiteImageData', this.bigDarkImgData)
    }
  }
}
</script>

<style></style>
