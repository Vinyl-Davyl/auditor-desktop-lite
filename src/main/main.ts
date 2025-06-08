import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload/preload.js"),
    },
  });

  // In development, load from the Vite dev server
  if (isDev) {
    console.log("Loading development server...");
    mainWindow.loadURL("http://localhost:3001/index.html");
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built index.html
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle file selection
ipcMain.handle("select-files", async () => {
  if (!mainWindow) return null;

  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "JavaScript/TypeScript", extensions: ["js", "jsx", "ts", "tsx"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  return result.filePaths;
});

// Handle file reading
ipcMain.handle("read-file", async (_, filePath) => {
  try {
    const fs = require("fs").promises;
    const content = await fs.readFile(filePath, "utf-8");
    return { success: true, content };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
