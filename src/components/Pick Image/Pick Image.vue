<template>
  <div>
    <br />
    <v-btn @click="pickFile">Foto wählen</v-btn>
    <input
        type="file"
        style="display: none"
        ref="fileInput"
        @change="filePicked"/>

    <br/>
    <br/>

    <v-container v-if="imageLoaded" fill-height fluid>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col align="center" cols="8">
          <v-card class="py-5">
            <div>Originalbild:</div>
            <br/>
            <v-img style="align-items: center;" max-width="1000" max-height="1000" :src="imageUrl"
                   alt="Bilddatei beschädigt (lässt sich nicht öffnen!)" v-on:error="imgError"/>
          </v-card>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>

    <div v-if="error" class="wrongInput">Bilddatei beschädigt - sie lässt sich nicht öffnen!</div>
    <div v-if="noImage" class="wrongInput">
      Nur ein jpg, jpeg oder png Bild ist erlaubt!
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import store from "@/store/store";

export default {
  name: 'PickImage',
  props: {
    msg: String
  },
  data() {
    return {
      filename: "",
      imageUrl: "",
      image: "",
      isImage: false,
      noImage: false,
      imageLoaded: false,
      fotoDescription: "",
      xPixels: -1,
      yPixels: -1,
      error: false,
      pixelsLoaded: false,
    }
  },
  methods: {
    ...mapMutations(['updateImage', 'updateBlackWhiteImage', 'updateBlackWhiteImageData', 'updateBigBlackWhiteImage', 'updateBigBlackWhiteImageData']),
    pickFile() {
      this.$refs.fileInput.click()
    },
    filePicked(event) {
      const files = event.target.files
      this.filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('error', () => {
        this.noImage = true
        this.isEncrypted = false
        this.setImagesInStore()
      })
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', () => {
        this.checkIfImage(this.filename)
        if (this.isImage) {
          this.download = true
          this.imageUrl = fileReader.result
          const image = new Image();
          image.src = this.imageUrl
          image.onload = () => {
            this.image = image
            this.xPixels = image.width
            this.yPixels = image.height
            if (this.xPixels !== undefined && this.yPixels !== undefined) {
              this.pixelsLoaded = true
            }
            this.setImagesInStore()
          }

          this.imageUrl = image.src
          this.noImage = false
          this.error = false
          this.imageLoaded = true
        } else {
          this.pixelsLoaded = false
          this.noImage = true
          this.error = false
          this.imageLoaded = true
          this.xPixels = 0
          this.yPixels = 0
        }
      })
    },
    imgError() {
      this.isImage = false
      this.error = true
    },
    checkIfImage(imageName) {
      const len = imageName.length
      const ending = imageName.slice(len - 3, len)
      const longEnding = imageName.slice(len - 4, len)
      if (ending === "png" || ending === "jpg" || longEnding === "jpeg") {
        this.isImage = true
        this.fotoDescription = "Foto: "
      } else {
        this.isImage = false
        this.fotoDescription = ""
      }
      this.isEncrypted = false
    },
    setImagesInStore() {
      store.commit('updateImage', this.image)
      store.commit('updateBlackWhiteImage', "")
      store.commit('updateBlackWhiteImageData', "")
      store.commit('updateBigBlackWhiteImage', "")
      store.commit('updateBigBlackWhiteImageData', "")
    }
  }
}
</script>

<style scoped>
.wrongInput {
  background-color: red;
  color: white;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
