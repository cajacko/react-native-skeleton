# React Native Skeleton

# Android Setup

* Setup new app on Google Play Console
* Manually sign the app an upload first build
* Setup fastlane

## Manually sign the app an upload first build

See: https://facebook.github.io/react-native/docs/signed-apk-android.html

Key is valid for 1000 days

* `keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
* Name - Charlie Jackson
* Organisational Unit - Development
* Organisation - Curious Squid
* City - London
* State - London
* Country Code - UK
* This creates `my-release-key.keystore`
* Put in android/app/my-release-key.keystore
* .gitignore this
* Create a new file or add the following to ~/android/gradle.properties
* This file should be in .gitignore

```
# Project-wide Gradle settings.

# IDE (e.g. Android Studio) users:
# Gradle settings configured through the IDE *will override*
# any settings specified in this file.

# For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html

# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx10248m -XX:MaxPermSize=256m
# org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
# org.gradle.parallel=true

android.useDeprecatedNdk=true
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

* Override \*\*\*\*\* with the passwords entered above
* Run `yarn release:android`
  * Added `-x lintVitalRelease` to this command is the linting was failing for some reason
* APK built to: ~/android/app/build/outputs/apk/release/app-release.apk
* Upload to Google Play Console, under App Releases/Internal test

## Setup fastlane

https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply

* Create a service account on Google Developers Console, and link with Google Play Console
  * https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply
* Save the json key to `~/android/google-service-account-key.json`
* `fastlane supply init`
  * Service acount json file is: google-service-account-key.json
  * Package name is the one fonud in the Google Play Console, when you click on "All Applications" and you see the name underneath the app title. Will be something like com.reactnativeskeleton
