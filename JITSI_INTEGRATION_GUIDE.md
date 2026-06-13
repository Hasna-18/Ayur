# Jitsi Integration for Online Video Calls - Implementation Guide

## ✅ What's Been Implemented

### 1. **Database Schema**
- Added `jitsiRoom` field to the `Appointment` model in Prisma schema
- Migration file created (pending database connection to apply)

### 2. **Jitsi Components & Utilities**

#### `/lib/jitsi-utils.js`
- `generateJitsiRoomName(appointmentId)` - Generates unique room names for each appointment
- `getJitsiConfig()` - Returns Jitsi configuration options

#### `/components/jitsi-meeting.jsx`
- React component that embeds Jitsi Meet video conference
- Loads Jitsi API dynamically from official instance
- Handles video call initialization and cleanup
- Supports user names and call termination callbacks

### 3. **API Updates**

#### `/app/api/user/appointments/route.js`
- Updated POST endpoint to generate Jitsi room when appointment is booked
- Room name is stored in database for later access

### 4. **Patient Interface**

#### `/app/user/appointment-list/page.js`
- Added "Join Call" button for scheduled appointments
- Opens modal with embedded Jitsi video conference
- Shows patient name in video call
- Patients can cancel calls by closing the modal

### 5. **Doctor/Admin Interface**

#### `/app/admin/appointments/page.js`
- Added "Join Call" button in the appointments table
- Video call modal for doctor to join meetings
- Displays patient information during call
- Maintains existing appointment management functionality

---

## 🚀 How It Works

1. **Appointment Booking**: When a patient books an appointment, a unique Jitsi room name is generated (format: `appointment-{id}-{timestamp}`)

2. **Video Call Access**: Both patient and doctor see a "Join Call" button for scheduled appointments

3. **Meeting Room**: Clicking "Join Call" opens a modal with embedded Jitsi Meet video conference

4. **Room Sharing**: The same room ID ensures both patient and doctor join the same meeting

---

## 📋 Running the Migration

When your database is back online, run:

```bash
cd "c:\Users\VIGNESH\HASNA\Ayur\Ayur"
npx prisma migrate dev --name add_jitsi_room
```

Or apply existing migration:
```bash
npx prisma migrate deploy
```

---

## 🔧 Configuration Notes

- **Jitsi Instance**: Uses official free instance `meet.jitsi.example.com`
- **Video Features**: Microphone, camera, chat, screen sharing, recording enabled
- **No Authentication Required**: Open video conferences (you can add token-based auth later if needed)

---

## 📝 Features Included

✅ Unique room generation per appointment  
✅ Video call modal dialog  
✅ Patient & doctor video integration  
✅ Room persistence in database  
✅ Call join buttons on both interfaces  
✅ Responsive design  
✅ Error handling  

---

## 🔮 Future Enhancements (Optional)

- Add scheduled notifications before appointment time
- Record video calls for medical records
- Add Jitsi token authentication for better security
- Email Jitsi link to patient & doctor when appointment is created
- Add video call history/recordings management
- Set automatic call start/end based on appointment time

---

## ⚠️ Important Notes

1. **Database Migration**: Once database is online, run the migration to add `jitsiRoom` column
2. **Jitsi Terms**: Using free instance - review Jitsi terms for production use
3. **For Production**: Consider self-hosted Jitsi or token-based authentication
4. **Browser Support**: Requires modern browser with WebRTC support (Chrome, Firefox, Edge, Safari)

