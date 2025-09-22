#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const iosAppId = 'ca-app-pub-3940256099942544~1458002511';
const androidAppId = 'ca-app-pub-3940256099942544~3347511713';
const iosTrackingMessage = '需要取得您的追蹤權限來提供個人化廣告體驗。';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyTemplateIfMissing(templateRel, targetRel) {
  const templatePath = path.join(root, templateRel);
  const targetPath = path.join(root, targetRel);

  if (!existsSync(templatePath)) {
    return false;
  }

  if (existsSync(targetPath)) {
    return false;
  }

  await ensureDir(path.dirname(targetPath));
  const buffer = await fs.readFile(templatePath);
  await fs.writeFile(targetPath, buffer);
  console.log(`Created ${targetRel}`);
  return true;
}

async function ensureInfoPlist() {
  const targetRel = 'mobile/ios/App/App/Info.plist';
  const templateRel = 'mobile/ios/templates/Info.plist';

  if (!existsSync(path.join(root, targetRel))) {
    await copyTemplateIfMissing(templateRel, targetRel);
    return;
  }

  const targetPath = path.join(root, targetRel);
  let content = await fs.readFile(targetPath, 'utf8');
  let updated = false;

  if (!content.includes('<key>GADApplicationIdentifier</key>')) {
    const insertion = `    <key>GADApplicationIdentifier</key>\n    <string>${iosAppId}</string>\n`;
    content = content.replace(/<\/dict>\s*<\/plist>/, `${insertion}</dict>\n</plist>`);
    updated = true;
  } else {
    const regex = /(\s*<key>GADApplicationIdentifier<\/key>\s*<string>)([^<]+)(<\/string>)/;
    content = content.replace(regex, `$1${iosAppId}$3`);
  }

  if (!content.includes('<key>NSUserTrackingUsageDescription</key>')) {
    const insertion = `    <key>NSUserTrackingUsageDescription</key>\n    <string>${iosTrackingMessage}</string>\n`;
    content = content.replace(/<\/dict>\s*<\/plist>/, `${insertion}</dict>\n</plist>`);
    updated = true;
  } else {
    const regex = /(\s*<key>NSUserTrackingUsageDescription<\/key>\s*<string>)([^<]+)(<\/string>)/;
    content = content.replace(regex, `$1${iosTrackingMessage}$3`);
  }

  if (updated) {
    await fs.writeFile(targetPath, content, 'utf8');
    console.log('Updated Info.plist with AdMob identifiers.');
  }
}

async function ensureIosPrivacyManifest() {
  await copyTemplateIfMissing(
    'mobile/ios/templates/PrivacyInfo.xcprivacy',
    'mobile/ios/App/App/PrivacyInfo.xcprivacy'
  );
}

async function ensurePodfile() {
  const targetRel = 'mobile/ios/App/Podfile';
  const templateRel = 'mobile/ios/templates/Podfile';
  if (!(await copyTemplateIfMissing(templateRel, targetRel))) {
    const targetPath = path.join(root, targetRel);
    if (!existsSync(targetPath)) {
      return;
    }
    let content = await fs.readFile(targetPath, 'utf8');
    let updated = false;
    if (!content.includes("pod 'Google-Mobile-Ads-SDK'")) {
      content = content.replace(/target\s+'App'\s+do/, match => `${match}\n  pod 'Google-Mobile-Ads-SDK'`);
      updated = true;
    }
    const admobPod = "pod 'CapacitorCommunityAdmob'";
    if (!content.includes(admobPod)) {
      content = content.replace(/def capacitor_pods[\s\S]+?end/, block => {
        if (block.includes(admobPod)) {
          return block;
        }
        return block.replace(/end\s*$/, "  if File.exist?(File.join(__dir__, '../../node_modules/@capacitor-community/admob'))\n    pod 'CapacitorCommunityAdmob', :path => '../../node_modules/@capacitor-community/admob'\n  end\nend\n");
      });
      updated = true;
    }
    if (updated) {
      await fs.writeFile(targetPath, content, 'utf8');
      console.log('Updated Podfile with AdMob pods.');
    }
  }
}

async function ensureAndroidManifest() {
  const targetRel = 'mobile/android/app/src/main/AndroidManifest.xml';
  const templateRel = 'mobile/android/templates/app/src/main/AndroidManifest.xml';

  if (!(await copyTemplateIfMissing(templateRel, targetRel))) {
    const targetPath = path.join(root, targetRel);
    if (!existsSync(targetPath)) {
      return;
    }
    let content = await fs.readFile(targetPath, 'utf8');
    let updated = false;

    if (!content.includes('android.permission.INTERNET')) {
      content = content.replace(
        /<application/,
        `    <uses-permission android:name="android.permission.INTERNET" />\n\n    <application`
      );
      updated = true;
    }

    if (!content.includes('com.google.android.gms.ads.APPLICATION_ID')) {
      content = content.replace(
        /<application[\s\S]*?>/,
        match =>
          match.replace(
            />\s*$/,
            `>\n        <meta-data\n            android:name="com.google.android.gms.ads.APPLICATION_ID"\n            android:value="@string/admob_app_id" />\n`
          )
      );
      updated = true;
    }

    if (updated) {
      await fs.writeFile(targetPath, content, 'utf8');
      console.log('Patched AndroidManifest.xml with AdMob configuration.');
    }
  }
}

async function ensureAndroidStrings() {
  const targetRel = 'mobile/android/app/src/main/res/values/strings.xml';
  const templateRel = 'mobile/android/templates/app/src/main/res/values/strings.xml';

  if (!(await copyTemplateIfMissing(templateRel, targetRel))) {
    const targetPath = path.join(root, targetRel);
    if (!existsSync(targetPath)) {
      return;
    }

    let content = await fs.readFile(targetPath, 'utf8');
    let updated = false;

    const admobRegex = /(\s*<string name="admob_app_id">)([^<]*)(<\/string>)/;
    if (admobRegex.test(content)) {
      content = content.replace(admobRegex, (match, start, value, end) => {
        if (value === androidAppId) {
          return match;
        }
        updated = true;
        return `${start}${androidAppId}${end}`;
      });
    } else {
      const insertion = `    <string name="admob_app_id">${androidAppId}</string>\n`;
      content = content.replace(/<\/resources>/, `${insertion}</resources>`);
      updated = true;
    }

    if (updated) {
      await fs.writeFile(targetPath, content, 'utf8');
      console.log('Ensured AdMob app id is configured in strings.xml.');
    }
  }
}

async function copyAndroidScaffoldFiles() {
  const mappings = [
    ['mobile/android/templates/build.gradle', 'mobile/android/build.gradle'],
    ['mobile/android/templates/capacitor.build.gradle', 'mobile/android/capacitor.build.gradle'],
    ['mobile/android/templates/settings.gradle', 'mobile/android/settings.gradle'],
    ['mobile/android/templates/capacitor.settings.gradle', 'mobile/android/capacitor.settings.gradle'],
    ['mobile/android/templates/gradle.properties', 'mobile/android/gradle.properties'],
    ['mobile/android/templates/.gitignore', 'mobile/android/.gitignore'],
    ['mobile/android/templates/app/build.gradle', 'mobile/android/app/build.gradle'],
    ['mobile/android/templates/app/proguard-rules.pro', 'mobile/android/app/proguard-rules.pro'],
    ['mobile/android/templates/app/src/main/res/xml/config.xml', 'mobile/android/app/src/main/res/xml/config.xml'],
    ['mobile/android/templates/app/src/main/java/com/example/tarotapp/MainActivity.kt',
      'mobile/android/app/src/main/java/com/example/tarotapp/MainActivity.kt'],
  ];

  for (const [template, target] of mappings) {
    await copyTemplateIfMissing(template, target);
  }
}

async function ensureIosScaffoldDirs() {
  await ensureDir(path.join(root, 'mobile/ios/App/App'));
}

async function main() {
  await ensureIosScaffoldDirs();
  await copyTemplateIfMissing('mobile/ios/templates/Info.plist', 'mobile/ios/App/App/Info.plist');
  await copyTemplateIfMissing('mobile/ios/templates/PrivacyInfo.xcprivacy', 'mobile/ios/App/App/PrivacyInfo.xcprivacy');
  await copyTemplateIfMissing('mobile/ios/templates/Podfile', 'mobile/ios/App/Podfile');

  await ensureInfoPlist();
  await ensureIosPrivacyManifest();
  await ensurePodfile();

  await copyTemplateIfMissing('mobile/android/templates/README.md', 'mobile/android/README.md');
  await copyAndroidScaffoldFiles();
  await ensureAndroidManifest();
  await ensureAndroidStrings();
}

main().catch((error) => {
  console.error('[cap-config] Failed to apply platform configuration', error);
  process.exit(1);
});
