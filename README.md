# Offline Video Language Changer

Free, offline-first Windows desktop application for dubbing videos while preserving the original scene timeline.

## Planned MVP

- Select a local video and target language
- Transcribe locally with faster-whisper
- Translate locally with Argos Translate
- Generate narration locally with Piper
- Fit every narration segment to its original timestamp
- Preserve the original video stream and export MP4 with FFmpeg
- Build a Windows installer through GitHub Actions

## Local development

The desktop shell uses Tauri 2, React, and TypeScript. The processing pipeline is Python-based.

Requirements: Node.js 20+, Rust, Python 3.10+, FFmpeg, faster-whisper, Argos Translate, and Piper with a downloaded voice model.

This branch contains the initial implementation and build workflow. Model files are intentionally not committed; they are downloaded/configured locally so the project remains free and redistributable.
