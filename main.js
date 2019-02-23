// Modules to control application life and create native browser window
const electron = require("electron");
const prepareNext = require("electron-next");
const isDev = require("electron-is-dev");

const { app, BrowserWindow, Tray, Menu } = electron;

const windowWidth = 300;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;
let isWindowVisible = false;

function toggleWindow() {
  if (isWindowVisible) {
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
  isWindowVisible = !isWindowVisible;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: 400,
    show: isDev,
    frame: isDev,
    resizable: isDev,
    skipTaskbar: !isDev,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  const devPath = "http://localhost:8000/start";
  const prodPath = `file://${__dirname}/renderer/out/start/index.html`;
  const entry = isDev ? devPath : prodPath;

  mainWindow.loadURL(entry);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createTray() {
  tray = new Tray("./assets/tray-icon.png");

  tray.on("click", function(_, { x, y }) {
    const { width } = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWindow.setPosition(
      x + windowWidth > width ? width - windowWidth : x,
      y
    );
    toggleWindow();
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit Now",
      click() {
        app.quit();
      }
    }
  ]);

  tray.on("right-click", function() {
    tray.popUpContextMenu(contextMenu);
  });

  // dismiss the pop up window when clicking outside
  mainWindow.on("blur", function() {
    mainWindow.hide();
    isWindowVisible = false;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  await prepareNext("./renderer");
  createWindow();
  if (isDev) return;
  createTray();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
if (!isDev) {
  app.dock.hide();
}
