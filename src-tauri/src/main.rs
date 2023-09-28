// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]

fn save_to_file(data: serde_json::Value) -> Result<bool, String> {
    let file_path = "../game/settings.json";

    let data_str = serde_json::to_string_pretty(&data).map_err(|e| e.to_string())?;

    if let Err(err) = std::fs::write(file_path, data_str) {
        return Err(err.to_string());
    }

    Ok(true)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_to_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}