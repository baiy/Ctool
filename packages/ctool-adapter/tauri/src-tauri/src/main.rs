#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn toggle_dev_tools(window: tauri::Window) {
    if !window.is_devtools_open() {
        window.open_devtools();
    } else {
        window.close_devtools();
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![toggle_dev_tools])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
