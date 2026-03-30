═══════════════════════════════════════════════════════════════
📱 AURA APP - TESTING GUIDE FOR 10 USERS  
═══════════════════════════════════════════════════════════════

This guide is for the initial 10 test users
Distribution Phase: March 30, 2026

═══════════════════════════════════════════════════════════════
🎯 QUICK START (5 MINUTES)
═══════════════════════════════════════════════════════════════

1. INSTALL APP
   • Download APK file
   • Enable "Unknown Sources" in Settings > Security
   • Open APK and tap "Install"
   • Wait for installation to complete

2. LAUNCH APP
   • Tap app icon from home screen
   • Grant camera and microphone permissions
   • Create your account with email/password

3. TEST CAMERA
   • Go to Live tab (📺)
   • Tap "GO LIVE" button
   • Camera should start (front camera)
   • Tap 📷 button to switch to back camera
   • Tap again to switch back to front
   • Tap 🎤 to toggle mic on/off
   • Tap "END LIVE" to stop

4. TEST PROFILE
   • Go to Profile tab (👤)
   • Look at your profile picture
   • Tap profile picture 5 times quickly
   • Admin panel should appear with purple border
   • Tap buttons to see options
   • Tap "Close Admin" to exit

═══════════════════════════════════════════════════════════════
✅ FULL TEST CHECKLIST (30 MINUTES)
═══════════════════════════════════════════════════════════════

ACCOUNT SETUP:
─────────────────────────────────────────────────────────────
[ ] Sign up successful
[ ] Account created with email
[ ] Can log back in
[ ] Stay logged in after app close
[ ] Logout button works
[ ] Redirects to login screen


CAMERA STREAMING:
─────────────────────────────────────────────────────────────
[ ] GO LIVE button visible
[ ] Camera starts when clicked
[ ] Camera preview shows (not black)
[ ] Front camera (selfie) works
[ ] Back camera switch button visible
[ ] Back camera switch works (switch twice to verify)
[ ] Mic toggle button visible
[ ] Mic toggle changes icon
[ ] "GO LIVE" changes to red when live
[ ] Viewer count displays
[ ] Viewer count increases while streaming
[ ] END LIVE button works
[ ] End live dialog appears
[ ] Can confirm stream end
[ ] Returns to previous screen


PROFILE & ADMIN:
─────────────────────────────────────────────────────────────
[ ] Profile tab loads
[ ] Profile picture displays
[ ] Username shows
[ ] Followers count shows
[ ] Following count shows
[ ] Lives count shows
[ ] Tap profile picture once (count 1)
[ ] Tap profile picture twice (count 2)
[ ] Tap profile picture 5 times quickly
[ ] Admin panel appears after 5 taps
[ ] Admin panel has purple border
[ ] "OWNER PANEL" header visible
[ ] 5 admin buttons visible (Users, Analytics, Ban, Coins, Close)
[ ] All buttons are clickable
[ ] Close Admin button exits panel
[ ] Colors section visible
[ ] Colors buttons clickable (select each)
[ ] Frames section visible
[ ] Frames buttons clickable (select each)
[ ] Settings button visible
[ ] Settings opens modal
[ ] Can change username
[ ] Can change profile picture (select emoji)
[ ] Settings modal closable
[ ] Logout button visible
[ ] Logout works


NAVIGATION:
─────────────────────────────────────────────────────────────
[ ] Live tab (📺) clickable
[ ] Live tab shows stream list
[ ] Messages tab (💬) clickable
[ ] Messages tab shows list
[ ] AuraFlow tab (🌊) clickable
[ ] AuraFlow tab shows content
[ ] AuraFarm tab (🎮) clickable
[ ] AuraFarm tab shows content
[ ] Profile tab (👤) clickable
[ ] Profile tab shows profile
[ ] Tab icons display correctly
[ ] Active tab highlighted in purple
[ ] Can switch between tabs smoothly


PERMISSIONS:
─────────────────────────────────────────────────────────────
[ ] Camera permission dialog appears
[ ] Can grant camera permission
[ ] App works after permission granted
[ ] Mic permission functional


STABILITY:
─────────────────────────────────────────────────────────────
[ ] No crashes on startup
[ ] No crashes when opening camera
[ ] No crashes when switching camera
[ ] No crashes on navigation
[ ] No crashes on logout
[ ] No crashes on admin panel
[ ] App responds to all touches
[ ] No freezing or lag


ERRORS & ALERTS:
─────────────────────────────────────────────────────────────
[ ] Error alerts display properly
[ ] Success alerts show confirmation
[ ] Camera permission alerts clear
[ ] No console errors in logcat
[ ] No red error screens

═══════════════════════════════════════════════════════════════
🐛 ISSUE REPORTING TEMPLATE
═══════════════════════════════════════════════════════════════

If you find a bug, report it with:

BUG REPORT:
─────────────────────────────────────────────────────────────
Title: [Brief description]
Severity: Critical / High / Medium / Low

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [Expected result vs Actual result]

Device Info:
- Phone model: [e.g., Samsung Galaxy A10]
- Android version: [e.g., 11]
- App version: 1.0.0

Screenshot/Video: [If applicable]

═══════════════════════════════════════════════════════════════
🔍 ADVANCED TESTING (45 MINUTES)
═══════════════════════════════════════════════════════════════

EDGE CASES:
─────────────────────────────────────────────────────────────
[ ] Test with low battery
[ ] Test with WiFi and mobile data
[ ] Test with camera permissions denied
[ ] Test with poor internet connection
[ ] Test landscape orientation
[ ] Test rapid tab switching
[ ] Test rapid camera switching
[ ] Test opening app multiple times
[ ] Test after device restart

CAMERA STRESS TEST:
─────────────────────────────────────────────────────────────
[ ] Start live, switch camera 10 times
[ ] Start live, toggle mic 10 times
[ ] Switch camera rapidly
[ ] Toggle mic rapidly
[ ] Start/end stream multiple times
[ ] Long streaming session (5+ minutes)

ADMIN PANEL STRESS TEST:
─────────────────────────────────────────────────────────────
[ ] Tap profile picture 5 times (admin panel appears)
[ ] Tap profile picture 3 more times (nothing happens - correct)
[ ] Close admin, tap profile 5 times again (appears again)
[ ] Repeat multiple times
[ ] Test all admin buttons
[ ] Verify admin styling consistent

═══════════════════════════════════════════════════════════════
🎬 USER JOURNEY TEST (15 MINUTES EACH)
═══════════════════════════════════════════════════════════════

TEST SCENARIO 1: NEW USER
─────────────────────────────────────────────────────────────
1. Fresh install
2. Grant permissions
3. Sign up with new account
4. View profile
5. Customize colors/frames
6. Go live (30 seconds)
7. End stream
8. Logout
[ ] All steps work
[ ] No crashes
[ ] Data persists

TEST SCENARIO 2: RETURNING USER
─────────────────────────────────────────────────────────────
1. Close app
2. Reopen app
3. Should be logged in
4. Go live again
5. Check profile stats
[ ] Session persists
[ ] Data loads correctly

TEST SCENARIO 3: ADMIN USER
─────────────────────────────────────────────────────────────
1. Login to admin account
2. Unlock admin panel (5 taps)
3. Test all admin features
4. Close and reopen admin
5. Verify still owner
[ ] Admin access consistent
[ ] All features functional

═══════════════════════════════════════════════════════════════
📊 PERFORMANCE BENCHMARKS
═══════════════════════════════════════════════════════════════

MEASURE THESE:
─────────────────────────────────────────────────────────────
⏱️ App startup time (should be < 5 seconds)
⏱️ Camera start time (should be < 2 seconds)
⏱️ Camera switch time (should be < 1 second)
📱 Battery drain (note battery % after 30 min use)
📊 Data usage (note data usage after session)
🔊 Audio quality (test mic clarity)
📹 Video preview (test fluidity)

═══════════════════════════════════════════════════════════════
💬 FEEDBACK SURVEY
═══════════════════════════════════════════════════════════════

After testing, please provide feedback:

1. CAMERA CONTROLS (rate 1-5)
   How intuitive are the camera switches?
   Feedback: _____________________________

2. ADMIN ACCESS (rate 1-5)  
   How easy is the 5-tap admin unlock?
   Feedback: _____________________________

3. UI/UX (rate 1-5)
   How is the overall user interface?
   Feedback: _____________________________

4. PERFORMANCE (rate 1-5)
   How is app performance/speed?
   Feedback: _____________________________

5. OVERALL EXPERIENCE (rate 1-5)
   Overall impression of the app?
   Feedback: _____________________________

6. SUGGESTIONS
   What features would you add?
   _________________________________________
   _________________________________________

═══════════════════════════════════════════════════════════════
✨ FEATURE HIGHLIGHT CHECKLIST
═══════════════════════════════════════════════════════════════

Experience these cool features:

[ ] Camera like TikTok (front/back switch)
[ ] Admin panel (secret 5-tap unlock)
[ ] Profile customization (colors & frames)
[ ] Real-time viewer count
[ ] Smooth camera switching
[ ] Microphone toggle
[ ] Dark theme
[ ] Bottom tab navigation
[ ] Settings modal
[ ] Clean, modern UI

═══════════════════════════════════════════════════════════════
🎯 FINAL TEST SIGN-OFF
═══════════════════════════════════════════════════════════════

TEST COMPLETION FORM:
─────────────────────────────────────────────────────────────

Tester Name: _______________________________
Device Model: _______________________________
Android Version: _______________________________
Date Tested: _______________________________

Priority Issues Found: 
[ ] 0 Issues (✅ Pass) [ ] 1-2 Issues (⚠️ Caution)
[ ] 3+ Issues (❌ Fail)

OVERALL VERDICT:
[ ] Ready for Distribution
[ ] Ready with Warnings
[ ] Needs Fixes

═══════════════════════════════════════════════════════════════
❓ FAQ FOR TESTERS
═══════════════════════════════════════════════════════════════

Q: Where is the admin panel?
A: Profile tab (👤) → Tap profile picture 5 times quickly

Q: How do I switch camera?
A: During live stream, tap the 📷 button

Q: How do I toggle mic?
A: During live stream, tap the 🎤 button  

Q: How do I customize profile?
A: Profile tab (👤) → Tap Colors or Frames sections

Q: How do I change settings?
A: Profile tab (👤) → Tap ⚙️ Settings button

Q: Why is camera blank?
A: Grant camera permission when prompted

Q: How do I logout?
A: Profile tab (👤) → Scroll down → Tap 🚪 Logout

Q: Is my data saved?
A: Yes, all user data is in Firebase Firestore

═══════════════════════════════════════════════════════════════
📞 SUPPORT CONTACT
═══════════════════════════════════════════════════════════════

For issues during testing:
1. Check this guide's FAQ
2. Try restarting app
3. Try restarting phone
4. Contact development team with:
   - Device model
   - Android version
   - Exact steps to reproduce
   - Screenshot if available

═══════════════════════════════════════════════════════════════

🎉 Thank you for testing Aura App!
Your feedback helps us improve the app!

═══════════════════════════════════════════════════════════════
