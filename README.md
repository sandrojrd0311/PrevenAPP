# PrevenApp (React Native / Expo)

## Instalación
```bash
npx create-expo-app@latest PrevenApp --template blank
cd PrevenApp
npx expo install @react-native-async-storage/async-storage expo-crypto expo-linear-gradient expo-status-bar react-native-svg react-native-safe-area-context @react-native-community/datetimepicker
```
Copia en la carpeta del proyecto (reemplazando App.js): `App.js`, `src/` y `assets/photos.js`.

```bash
npx expo start
```

## Fotos del equipo
Pon dev1.jpg ... dev4.jpg en `assets/img/` y descomenta los `require` en `assets/photos.js`.
