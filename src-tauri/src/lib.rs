use tauri::http::{Response, Uri};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {name}! You've been greeted from Rust!")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        // .register_uri_scheme_protocol("http", move |app_handle, request| {
        //     let uri = request.uri().to_string();
        //     let parsed = Uri::try_from(uri).unwrap();
        //
        //     // Only handle http://localhost:8000/*
        //     if parsed.authority().map(|a| a.as_str()) == Some("localhost:3000") {
        //         let path = parsed.path().trim_start_matches('/');
        //
        //         // Try to load the file from the app's resource dir
        //         let asset_path = if path.is_empty() { "index.html" } else { path };
        //
        //         // Get the asset resolver from the app handle
        //         let asset_resolver = app_handle.app_handle().asset_resolver();
        //         let asset_bytes = match asset_resolver.get(asset_path.to_string()) {
        //             Some(asset) => asset,
        //             None => match asset_resolver.get("index.html".to_string()) {
        //                 Some(fallback) => fallback,
        //                 None => {
        //                     return Response::builder()
        //                         .status(404)
        //                         .body(Vec::new())
        //                         .expect("fail to return 404 err response")
        //                 }
        //             },
        //         };
        //
        //         // Simple MIME type detection based on file extension
        //         let content_type = match asset_path.split('.').next_back() {
        //             Some("html") => "text/html",
        //             Some("css") => "text/css",
        //             Some("js") => "application/javascript",
        //             Some("json") => "application/json",
        //             Some("png") => "image/png",
        //             Some("jpg") | Some("jpeg") => "image/jpeg",
        //             Some("gif") => "image/gif",
        //             Some("svg") => "image/svg+xml",
        //             Some("ico") => "image/x-icon",
        //             _ => "application/octet-stream",
        //         };
        //
        //         Response::builder()
        //             .status(200)
        //             .header("Content-Type", content_type)
        //             .body(asset_bytes.bytes().to_vec())
        //             .expect("fail to return 200 response")
        //     } else {
        //         Response::builder()
        //             .status(404)
        //             .body(Vec::new())
        //             .expect("fail to return 404 err response")
        //     }
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
