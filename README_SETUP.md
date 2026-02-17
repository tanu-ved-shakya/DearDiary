# DearDiary Backend Setup

It looks like your computer is missing the **MongoDB Database Server**, or it is not running.
The application needs this database to store valid users and diary entries.

## How to Fix

### Option 1: You verified you have MongoDB installed
1. Open a terminal/command prompt.
2. Type `mongod` and press Enter.
3. If it starts (you see lines of text appearing), keep that window OPEN.
4. Open a **new** terminal for your project and run `node server.js`.

### Option 2: You don't have MongoDB installed
MongoDB Compass is just a viewer; it does not include the database itself.

1. **Download MongoDB Community Server**:
   - Go to: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Download the MSI installer for Windows.
2. **Install**:
   - Run the installer.
   - **Crucial**: Select "Install MongoDB as a Service" (this is usually checked by default).
   - This ensures MongoDB runs automatically when you turn on your computer.
3. **Verify**:
   - After installation, open a new terminal and type `mongod --version`.
   - Or just try running `node server.js` again.

## Need Help?
If you are stuck, you can use a free cloud database like **MongoDB Atlas** instead of installing it locally. Let me know if you want to switch to the cloud!
