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

use std::fs;
use std::path::Path;

#[derive(serde::Deserialize)]
struct ListFilesArgs {
    folder_path: String,
}


fn list_files_recursive(dir_path: &Path, file_names: &mut Vec<String>) -> Result<(), String> {
    for entry in fs::read_dir(dir_path).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        if path.is_dir() {
            list_files_recursive(&path, file_names)?;
        } else {
            if let Some(file_name) = path.to_str() {
                file_names.push(file_name.to_string());
            }
        }
    }
    Ok(())
}

#[tauri::command]
fn list_files(args: ListFilesArgs) -> Result<Vec<String>, String> {
    let dir_path = Path::new(&args.folder_path);
    let mut file_names = Vec::new();
    if dir_path.is_dir() {
        if let Err(error) = list_files_recursive(dir_path, &mut file_names) {
            return Err(error);
        }
    } else {
        return Err("Provided path is not a directory.".to_string());
    }
    Ok(file_names)
}
#[derive(serde::Deserialize)]
struct ListFoldersArgs {
    folder_path: String,
}
#[tauri::command]
fn list_folders(args: ListFoldersArgs) -> Result<Vec<String>, String> {
    let dir_path = Path::new(&args.folder_path);
    let mut folder_names = Vec::new();
    if dir_path.is_dir() {
        for entry in fs::read_dir(dir_path).map_err(|e| e.to_string())? {
            let entry = entry.map_err(|e| e.to_string())?;
            if entry.file_type().map_err(|e| e.to_string())?.is_dir() {
                if let Some(folder_name) = entry.file_name().to_str() {
                    folder_names.push(folder_name.to_string());
                }
            }
        }
    } else {
        return Err("Provided path is not a directory.".to_string());
    }
    Ok(folder_names)
}

#[derive(serde::Deserialize)]
struct CreateFolderArgs {
    folder_path: String,
    folder_name: String,
}
#[tauri::command]
fn create_folder(args: CreateFolderArgs) -> Result<(), String> {
    let folder_path = Path::new(&args.folder_path);
    let new_folder_path = folder_path.join(&args.folder_name);

    match fs::create_dir(&new_folder_path) {
        Ok(_) => Ok(()),
        Err(err) => Err(err.to_string()),
    }
}

#[derive(serde::Deserialize)]
struct CreateSaveFileArgs {
    folder_path: String,
    folder_name: String,
    file_name: String,
    file_info: serde_json::Value,
    stats_data: serde_json::Value,
}

#[tauri::command]
fn create_save_file(args: CreateSaveFileArgs) -> Result<(), String> {
    let folder_path = Path::new(&args.folder_path).join(&args.folder_name);
    let file_path = folder_path.join(&args.file_name);

    let combined_data = serde_json::json!({
        "fileInfo": args.file_info,
        "playerData": args.stats_data
    });

    let combined_data_str = serde_json::to_string_pretty(&combined_data).map_err(|e| e.to_string())?;

    if let Err(err) = std::fs::write(file_path, combined_data_str) {
        return Err(err.to_string());
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![list_files, save_to_file, list_folders, create_folder, create_save_file])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}