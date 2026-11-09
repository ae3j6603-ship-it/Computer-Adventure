# Validation

- `npm test`: 3 reward calculation tests passed.
- `npm run test:rules`: 10 Firestore Emulator security tests passed.
- `npm run check`: syntax checks passed.
- Browser game QA: movement, follow camera, collection, lesson display, mission rewards, inventory, reload/resume and local admin save were tested in the preceding build.
- `npm run test:integration`: attempted with Auth, Firestore and Functions Emulators. The Functions runtime could not listen on a Unix socket in this execution environment (`listen EPERM /tmp/fire_emu_*.sock`), so integration validation is not claimed as passing locally. GitHub Actions includes this check on a standard Ubuntu runner.
- Real Google OAuth, Firebase deployment and cross-device resume require a connected real Firebase project; not yet verified.

No production credentials, project ID or service-account private keys were added.
