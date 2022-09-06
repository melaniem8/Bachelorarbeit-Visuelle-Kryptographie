import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    image: "",
    blackWhiteImage: "",
    blackWhiteImageData: [],
    bigBlackWhiteImage: "",
    bigBlackWhiteImageData: [],
    share1: "",
    share1ImageData: [],
    share2: "",
    share2ImageData: [],
    classicDecryptedImage: "",
    otpDecryptedImage: ""
}

const getters = {
    cImage(state) { return state.image },
    cBlackWhiteImage(state) { return state.blackWhiteImage },
    cBlackWhiteImageData(state) { return state.blackWhiteImageData },
    cBigBlackWhiteImage(state) { return state.bigBlackWhiteImage },
    cBigBlackWhiteImageData(state) { return state.bigBlackWhiteImageData },
    cShare1(state) { return state.share1 },
    cShare1ImageData(state) { return state.share1ImageData },
    cShare2ImageData(state) { return state.share2ImageData },
    cShare2(state) { return state.share2 },
    cDecrypted(state) { return state.classicDecryptedImage },
    otpDecrypted(state) { return state.otpDecryptedImage }
}

const mutations = {
    updateImage(state, image) {
        state.image = image
    },
    updateBlackWhiteImage(state, blackWhiteImage) {
        state.blackWhiteImage = blackWhiteImage
    },
    updateBlackWhiteImageData(state, imageData) {
        state.blackWhiteImageData = imageData
    },
    updateBigBlackWhiteImage(state, bigBlackWhiteImage) {
        state.bigBlackWhiteImage = bigBlackWhiteImage
    },
    updateBigBlackWhiteImageData(state, bigBlackWhiteImageData) {
        state.bigBlackWhiteImageData = bigBlackWhiteImageData
    },
    updateShare1(state, share1) {
        state.share1 = share1
    },
    updateShare1ImageData(state, share1ImageData) {
        state.share1ImageData = share1ImageData
    },
    updateShare2(state, share2) {
        state.share2 = share2
    },
    updateShare2ImageData(state, share2ImageData) {
        state.share2ImageData = share2ImageData
    },
    updateClassicDecrypted(state, decrypted) {
        state.classicDecryptedImage = decrypted
    },
    updateOtpDecrypted(state, decrypted) {
        state.otpDecryptedImage = decrypted
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
})