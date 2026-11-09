# Computer Adventure — Firebase Spark
เกม 3D การออกแบบและเทคโนโลยี ใช้ HTML/CSS/JavaScript แบบ ES Modules และ Three.js ไม่มี Framework, PHP หรือ MySQL

## เปิดเล่น
https://computer-adventure-ae3j6603.web.app

Project ID: `computer-adventure-ae3j6603` — แผน Spark ไม่เชื่อม Cloud Billing และไม่ใช้ Cloud Functions

ตัวละครเดินด้วย WASD/ลูกศร กล้องติดตาม รองรับปุ่มสัมผัสบนมือถือ กด E เก็บไอเทมและอ่านบทเรียนภาพประกอบ กด I เปิดกระเป๋า แผนที่ Low Poly มีภูเขา ต้นไม้ แม่น้ำ สะพาน และอาคาร มีบทเรียน 12 หัวข้อ ภารกิจ 3 ขั้น Achievement คะแนนและกระดานคะแนน

Google Login และ Firestore ใช้บันทึกข้ามอุปกรณ์ ส่วน Guest บันทึกในเบราว์เซอร์และไม่รวมคะแนนเข้าสู่บัญชีคลาวด์ เครื่องที่ไม่มี WebGL ใช้ตัวเรนเดอร์ Canvas สำรองจากฉาก Three.js เดียวกัน

## แผนฟรี
เส้นทาง deploy นี้ใช้เฉพาะ Hosting, Google Authentication และ Firestore ภายใต้โควตา Spark ไม่มี Cloud Functions, Cloud Storage หรือบริการที่ต้องเปิด Blaze

Spark มีโควตาการอ่าน/เขียนฐานข้อมูลและการส่งข้อมูลเว็บไซต์ หากโควตาหมด บริการที่เกี่ยวข้องอาจหยุดจนโควตารีเซ็ต ไม่มีการอัปเกรดหรือคิดเงินอัตโนมัติหากไม่ได้เปิดบัญชีเรียกเก็บเงิน ตรวจการใช้งานใน Firebase Console

ตำแหน่งบันทึกทุก 30 วินาที รวมทั้งเมื่อเก็บไอเทมและซ่อนหน้าเว็บ การเก็บ 1 ชิ้นเขียน 3 เอกสารและมีการอ่านประกอบการตรวจสิทธิ์

## คะแนนและความปลอดภัย
โค้ด `dist/js/firebase/collect.js` ใช้ Firestore Transaction อ่าน inventory, progress และค่ารางวัล แล้วเขียน inventory, progress, leaderboard พร้อมกัน

Security Rules ตรวจ UID, รายการไอเทม 12 ID, การเพิ่มครั้งละ 1 ชิ้น, การไม่ซ้ำ/ไม่ลด/ไม่รีเซ็ตไอเทม, สูตรคะแนนจาก `game_settings/rewards`, ภารกิจที่สำเร็จ และ server timestamp ของเอกสารทั้งสาม การส่งคะแนนตามใจ เขียนกระดานคะแนนลำพัง หรือแก้ข้อมูลคนอื่นถูกปฏิเสธ

การเคลื่อนที่อยู่ฝั่ง client สำหรับการศึกษา ผู้ใช้ที่เรียก API เองอาจปลดล็อกไอเทมที่มีอยู่ทีละชิ้น แต่เพิ่มคะแนนจาก ID ซ้ำหรือกำหนดคะแนนตามใจไม่ได้ การแข่งขันที่ต้องยืนยันเส้นทางเดินจริงควรเพิ่มการตรวจการเล่นฝั่งเซิร์ฟเวอร์

## ผู้ดูแล
เปิด `/admin.html` ด้วยบัญชี Google ที่มีอีเมลยืนยันแล้วและอยู่ใน `admin_settings/access` ฟิลด์ `emails` รายการนี้ไม่เปิดให้ผู้เล่นทั่วไปอ่านหรือเขียน และแก้ได้ผ่าน Firebase Console เท่านั้น รองรับ custom claim `admin` เพิ่มเติมด้วย

หน้าแอดมินจัดการบทเรียน ไอเทม คะแนน ภารกิจ และดูรายชื่อผู้เล่น/ความคืบหน้า การแก้คะแนนรางวัลจะอัปเดต `game_settings/rewards` พร้อมกัน คะแนนบัญชีเดิมคำนวณใหม่เมื่อเก็บไอเทมครั้งถัดไป ควรกำหนดรางวัลก่อนเริ่มรอบเรียน บัญชีที่เก็บครบแล้วคงคะแนนเดิมจนผู้ดูแลปรับข้อมูลผ่าน Console

## ติดตั้งและอัปเดต
ใช้ Node.js 22 และ Java 21 สำหรับการทดสอบ Rules

```bash
git clone https://github.com/ae3j6603-ship-it/Computer-Adventure.git
cd Computer-Adventure
npm ci
npx firebase login
npm run deploy
```

Deploy เฉพาะ Firestore Rules และ Hosting ไม่มีการเปิด Billing หรือ deploy Functions Web Config อยู่ใน `dist/js/config/firebase-config.js` เป็นค่าบนเว็บสาธารณะ ห้ามใส่ Service Account, Private Key หรือ refresh token ใน repository

สำหรับโครงการใหม่ ให้สร้าง Firestore Standard เปิด Google ใน Authentication เพิ่มโดเมน Hosting ใน Authorized domains แล้วเปลี่ยน `.firebaserc` และ Web Config เป็นโครงการจริง

## ข้อมูลเริ่มต้น
โครงการใช้งานจริงติดตั้งข้อมูลแล้ว: 12 ไอเทม, 3 ภารกิจ, 2 เอกสาร game_settings และรายการผู้ดูแล

```bash
npm run bootstrap -- --project YOUR_PROJECT_ID --admin-email YOUR_ADMIN_EMAIL
```

สคริปต์ใช้บัญชี Firebase CLI ที่เข้าสู่ระบบอยู่ เพิ่มเฉพาะเอกสารที่ยังไม่มี ไม่เขียนทับผู้เล่น เนื้อหา หรือรายชื่อผู้ดูแล ไม่สร้าง Service Account key

## ทดสอบ
```bash
npm test
npm run check
npm run test:rules
npm run test:integration
```

3 unit tests, 22 Firestore Rules tests และ 3 integration tests ตรวจสูตรคะแนน การเก็บครบ 12 ชิ้น คะแนนปลอม การเก็บซ้ำ/พร้อมกัน ธุรกรรมที่ไม่ครบชุด ข้อมูลข้าม UID และอีเมลผู้ดูแลที่ยืนยันแล้ว GitHub Actions รันทั้งหมดโดยไม่ใช้ข้อมูลรับรอง production

## Collections
| Collection | หน้าที่ |
|---|---|
| users | โปรไฟล์ผู้เล่น |
| items | ไอเทมและบทเรียน |
| missions | ภารกิจและรางวัล |
| player_inventory | ไอเทม คะแนน ไอเทมล่าสุด |
| player_progress | ตำแหน่ง คะแนน ภารกิจสำเร็จ |
| leaderboard | ชื่อ คะแนน จำนวนไอเทม |
| game_settings | รางวัลที่ Rules ใช้ตรวจและค่าโลก |
| admin_settings | รายการอีเมลผู้ดูแลที่ป้องกันไว้ |

โมเดลสร้างด้วย Three.js geometry ภาพบทเรียนเป็น SVG ใน `dist/assets/images/` Three.js พร้อม MIT license อยู่ใน `dist/vendor/` โค้ดแยกใน `js/config`, `js/auth`, `js/game`, `js/firebase`, `js/modules`, `js/admin`
