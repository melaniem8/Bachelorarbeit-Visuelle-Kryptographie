<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-card class="mx-auto" style="text-align: left;">
          <v-card-title style="font-size: 40px;">Visuelle Kryptographie</v-card-title>
          <v-card-text style="font-size: 20px;">
            In dieser Bachelorarbeit wurde das Verfahren der visuellen Kryptographie implementiert. Sowohl das klassische
            Verfahren als auch das Verfahren mit dem klassischen One Time Pad sind links im Menü zu finden.
            <br/>
            <br/>
            Das klassische Verfahren nimmt ein Bild entgegen, wandelt es in schwarz und weiß um und vervierfacht die Größe.
            Anschließend wird jedes Pixel a 4 Stellen auf insgesamt 2 Folien verschlüsselt. Die erste wird zufällig mit
            schwarzen und weißen Pixeln belegt, wobei für jedes Pixel immer genau 2 schwarze und 2 weiße Pixel gewählt werden. Zum Schluss wird anhand
            dieser ersten Folie und dem originalen Schwarzweißbild die zweite Folie berechnet.
            <br/>
            <br/>
            Das One Time Pad Verfahren läuft bis auf das Vergrößern des Schwarzweißbildes gleich ab.
            <br />
            <br />
            <div style="color: red">INFO:</div>
            Beide Verfahren laden Bilder herunter - das Schwarzweißbild sowie die beiden verschlüsselten Bilder. Das klassische
            Verschlüsselungsverfahren lädt zusätzlich das vergrößerte Schwarzweißbild herunter. Diese Bilder werden
            gespeichert um sie anschließend anzuzeigen und sie können nach dem Download gelöscht werden.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
