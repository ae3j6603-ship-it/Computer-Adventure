# Computer Adventure
เกมผจญภัย 3D สำหรับวิชาการออกแบบและเทคโนโลยี ใช้ HTML5, CSS3, JavaScript แบบ ES Modules และ Three.js ไม่มี Framework, PHP, MySQL หรือ MVC

## สถานะการติดตั้ง
ซอร์สเกมและระบบ Firebase อยู่ใน repository นี้แล้ว ส่วนการเปิดใช้งาน Google Login, Firestore และ Firebase Hosting ต้องเชื่อมกับ Firebase project จริงก่อน ไม่มีการใส่ Project ID ปลอมหรือข้อมูลรับรองลงใน repository

## สิ่งที่เล่นได้
- ตัวละคร 3D เดินด้วย WASD/ลูกศร กล้องติดตาม รองรับปุ่มสัมผัสบนมือถือ
- เกาะ Low Poly มีภูเขา ต้นไม้ แม่น้ำ สะพาน อาคาร และจุดเรียนรู้ 12 จุด
- กด E เพื่อเก็บไอเทม เปิดบทเรียนพร้อมภาพ SVG และโจทย์ชวนคิด
- Inventory (กด I), Mission, Achievement, XP และ Leaderboard
- Guest บันทึกไอเทมและตำแหน่งในเบราว์เซอร์ เล่นต่อได้
- Firebase Google Login และ Firestore บันทึกข้ามอุปกรณ์เมื่อเชื่อมโครงการจริง
- หน้าแอดมินแก้บทเรียน/ไอเทม/ภารกิจ และดูผู้เล่น คะแนน ไอเทม และตำแหน่งล่าสุด
- มีตัวเรนเดอร์ Canvas สำรองจากฉาก Three.js เดียวกันสำหรับเครื่องที่ไม่มี WebGL

## ทดลองบนเครื่อง
ใช้ Node.js 22 และ Java 21 (Java จำเป็นเฉพาะการทดสอบ Firestore Rules)

```bash
git clone https://github.com/ae3j6603-ship-it/Computer-Adventure.git
cd Computer-Adventure
npm ci
npx firebase emulators:start --only hosting --project demo-computer-adventure
```
เปิด URL ของ Hosting Emulator ที่คำสั่งแสดง เกมใช้โหมด Guest จนกว่าจะใส่ Firebase Web Config อย่าเปิด index.html ด้วย file://

## ติดตั้ง Firebase สำหรับใช้งานจริง
1. สร้างหรือเลือก Firebase project ของโรงเรียน หากใช้ Cloud Functions ให้เปิดแผน Blaze ในบัญชีของคุณก่อน (มีค่าใช้จ่ายตามการใช้งาน)
2. เพิ่ม Web app ใน Firebase Console และสร้าง Cloud Firestore แนะนำเลือก region `asia-southeast1` (Cloud Function ในโปรเจกต์นี้ใช้ region นี้)
3. เปิด Authentication → Sign-in method → Google ตั้ง support email และเพิ่มโดเมนใช้งานจริงใน Authorized domains
4. นำเฉพาะ **Firebase Web Config** ใส่ `dist/js/config/firebase-config.js` แทน `null` ค่านี้ใช้บนเว็บได้ ห้ามใส่ Service Account/Private Key
5. เข้าสู่ระบบ CLI และเลือก project จริง:

```bash
npx firebase login
npx firebase projects:list
npx firebase use --add
npm ci --prefix functions
npm run deploy
```

`firebase use --add` จะสร้าง `.firebaserc` จาก Project ID จริง อย่าใช้ชื่อ `Computer-Adventure` หรือ Demo ID แทน Project ID โดยเดาเอง
`npm run deploy` เผยแพร่ `firestore.rules`, callable Cloud Function และไฟล์ใน `dist/` ขึ้น Firebase Hosting คำสั่งจะแสดง URL จริงหลังสำเร็จ

6. เข้าหน้าเกมบนโดเมน Firebase Hosting แล้วเข้าสู่ระบบ Google อย่างน้อย 1 ครั้ง เพื่อสร้างบัญชีผู้ดูแลใน Firebase Auth
7. เตรียมข้อมูลเริ่มต้นและกำหนดผู้ดูแลจาก environment ที่เชื่อถือได้ โดยใช้ Google Application Default Credentials ที่มีสิทธิ์ใน Firebase project:

```bash
gcloud auth application-default login
npm run bootstrap -- --project YOUR_REAL_PROJECT_ID --admin-email YOUR_ADMIN_EMAIL
```

สคริปต์เพิ่ม 12 บทเรียน, 3 ภารกิจ และ `game_settings/world` โดยไม่เขียนทับเนื้อหาที่มีอยู่หรือข้อมูลผู้เล่น กำหนด custom claim `admin: true` ให้บัญชีที่ระบุ และรักษา claims เดิมเอาไว้ หากไม่ใส่ `--admin-email` จะเตรียมเฉพาะข้อมูล
หากใช้ Service Account ภายในเครื่อง ให้ตั้ง `GOOGLE_APPLICATION_CREDENTIALS` ชี้ไปยังไฟล์ที่เก็บภายนอก repository เท่านั้น ห้ามอัปโหลดไฟล์นี้ขึ้น GitHub

8. ออกจากระบบแล้วเข้าสู่ระบบ Google ใหม่ เพื่อรับสิทธิ์ผู้ดูแล เข้า `/admin.html` เพื่อตรวจเนื้อหาและผู้เล่น
9. ทดสอบเก็บไอเทม ออกจากระบบ และเข้าอีกอุปกรณ์ ไอเทม คะแนน และตำแหน่งต้องกลับมาตรงกัน

### การตั้งค่าเฉพาะเบราว์เซอร์
`admin.html → ตั้งค่า Firebase` ใช้ทดลอง Web Config ได้โดยไม่แก้โค้ด แต่มีผลเฉพาะเบราว์เซอร์นั้น การใช้งานทั้งโรงเรียนต้องใส่ Config ในไฟล์และ deploy ตามขั้นตอนด้านบน

## ความปลอดภัยของข้อมูลและคะแนน
- `users/{uid}` ให้เจ้าของอ่าน/แก้เฉพาะโปรไฟล์ และผู้ดูแลอ่านรายชื่อได้
- ผู้เล่นแก้ตำแหน่งได้เฉพาะ UID ของตัวเอง และต้องอยู่ในขอบแผนที่
- Firestore Rules ปฏิเสธการเขียนคะแนน, รายการไอเทม, ภารกิจที่สำเร็จ และ leaderboard จากเว็บทุกบัญชี แม้เป็น browser admin
- เฉพาะ callable `collectItem` ที่ต้องมี Firebase Auth เท่านั้นเขียนรางวัลได้ คำนวณคะแนนจาก catalog ฝั่งเซิร์ฟเวอร์และใช้ transaction ป้องกันการเก็บซ้ำเพิ่มคะแนน
- ผู้ดูแลอาศัย Firebase Auth custom claim ที่กำหนดจาก Admin SDK เท่านั้น เพิ่ม `admin` ในโปรไฟล์เพื่อยกระดับสิทธิ์ไม่ได้
- คะแนน Guest ไม่ถูกนำเข้าสู่บัญชีคลาวด์ บัญชีที่เข้าสู่ระบบจะโหลดข้อมูลของ UID นั้นโดยตรง

เกมนี้ใช้การเคลื่อนที่ฝั่ง client สำหรับการเรียนรู้ ไม่ใช่ระบบแข่งขันที่ป้องกันการโกงการเคลื่อนที่ ผู้ใช้ที่เรียก callable เองอาจปลดล็อกไอเทมที่มีใน catalog แต่กำหนดคะแนนตามใจหรือแก้คะแนนคนอื่นไม่ได้ หากจะใช้แข่งขันควรเพิ่มการตรวจการเล่นบนเซิร์ฟเวอร์และเปิด App Check

## Firestore Collections
| Collection | ข้อมูลหลัก | ผู้เขียน |
|---|---|---|
| users | displayName, photoURL, updatedAt | เจ้าของโปรไฟล์ |
| items | name, title, icon, body, challenge, x, z, zone, points, color | ผู้ดูแล |
| missions | name, description, required, reward | ผู้ดูแล |
| player_inventory | ids[], updatedAt | Cloud Function |
| player_progress | position{x,z}, score, completedMissions[], updatedAt | เจ้าของแก้ position; Function แก้รางวัล |
| leaderboard | displayName, score, itemCount, updatedAt | Cloud Function |
| game_settings | ค่าตั้งต้นของโลก | ผู้ดูแลผ่าน Console / bootstrap |

## ตรวจสอบระบบ
```bash
npm test
npm run check
npm run test:rules
npm run test:integration
```
- Unit tests: ป้องกันคะแนนเพิ่มจาก ID ซ้ำ, ID ปลอม และรางวัลภารกิจซ้ำ
- Firestore Emulator tests: การแยกข้อมูลผู้เล่น การป้องกันคะแนน/Inventory/Leaderboard การยกระดับสิทธิ์ การแก้บทเรียน และขอบเขตตำแหน่ง
- Integration tests: เรียก callable ผ่าน Firebase Auth/Functions/Firestore Emulators ตรวจการล็อกอิน การเก็บพร้อมกัน คะแนนซ้ำ และ UID
- GitHub Actions รันการตรวจทั้งหมดเมื่อ push main หรือเปิด Pull Request โดยไม่ deploy และไม่ใช้รหัสลับ production
- ทดสอบ Google Login และการบันทึกข้ามอุปกรณ์แบบ end-to-end หลังเชื่อม Firebase จริง

## โครงสร้าง
```text
dist/
  index.html
  game.html
  admin.html
  assets/css/
  assets/js/
  assets/images/
  js/config/
  js/auth/
  js/game/
  js/firebase/
  js/modules/
  js/admin/
  vendor/
functions/              # trusted callable backend
scripts/bootstrap.mjs   # seed data + assign admin
firestore.rules
firebase.json
test/
.github/workflows/ci.yml
```
โมเดลทั้งหมดสร้างด้วย geometry ใน Three.js ไม่จำเป็นต้องดาวน์โหลดไฟล์โมเดล 3D ภายนอก Three.js 0.170.0 พร้อม MIT license เก็บใน `dist/vendor/` Firebase Web SDK โหลดจาก Google CDN เมื่อมี Config
