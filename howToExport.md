Generovanie kľúča

V zložke C:\Program Files\Java\jdkx.x.x_x\bin (podľa verzia jdk) viete generovať kľúč. My už jeden máme ale ak by bola potreba na ďaľší, tak spustíte z tejto zložky príkaz keytool -genkey -v -keystore nazov-kluca.keystore -alias alias-mojho-kluca -keyalg RSA -keysize 2048 -validity 10000, kde namiesto nazov-kluca a alias-mojho-kluca možete dať hocičo, všetky informácie si je ale potrebné zapamätať!

Po vyplnení požadovaných informácií sa vytvorí v zložke nazov-kluca.keystore. Toto bude Váš nový kľúč, ktorý nesmie byť za žiadnu cenu zverejnený. To isté sa týka gradle súborov, ktoré obsahujú mená a heslá.

Váš keystore presuňte do android/app.

Voliteľné - uloženie údajov ako globálne premenné

Ak chcete, môžete uložiť potrebné údaje (keystore názov, alias, store heslo, key heslo) do súboru gradle.properties. Príkladom takéhoto uloženia môže byť napríklad:

MYAPP_RELEASE_STORE_FILE=nazov-kluca.keystore

MYAPP_RELEASE_KEY_ALIAS=alias-mojho-kluca

MYAPP_RELEASE_STORE_PASSWORD=*****

MYAPP_RELEASE_KEY_PASSWORD=*****

Pridanie release nastavenia

Do zložky android/app/build.gradle

`android {
...

defaultConfig { ... }

signingConfigs {

    release {

        storeFile file("nazov-kluca.keystore")

        storePassword "moje store heslo"

        keyAlias "moj alias"

        keyPassword "moje key heslo"

    }

}

buildTypes {

    release {

        ...

        signingConfig signingConfigs.release

    }

}
}`
Nezabudnite zapísať na správne miesto aj signingConfig. Ak používate premenné vložte ich namiesto údajov bez úvodzoviek. zo zložky android spustite príkaz ./gradlew assembleRelease --console plain Po dokončení by sa mala napísať správa o úspechu a v zložke android/app/build/outputs/apk/ by sa mala nachádzať podpísaná apk 'app-release.apk'
