type WindowType = "launcher" | "workspace" | "settings";

type WindowData = {
  type: WindowType;
  workspace?: string;
}
