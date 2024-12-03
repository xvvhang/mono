export const defaultSettings: Settings = {
  theme: "dark",
  lastWorkspace: "",
  workspaces: []
}

export const defaultLauncherWindowOptions = {
  width: 720,
  height: 450,
  resizable: false,
  maximizable: false,
  frame: false,
  titleBarStyle: "hiddenInset" as const
}

export const defaultWorkspaceWindowOptions = {
  width: 1280,
  height: 720,
  frame: false,
  titleBarStyle: "hiddenInset" as const
}

export const defaultSettingsWindowOptions = {
  width: 800,
  height: 600,
  frame: false,
  titleBarStyle: "hiddenInset" as const
}
