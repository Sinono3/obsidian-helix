# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [Unreleased]

## [0.1.8]

### Fixed

- Incorrect version in `manifest.json` (#11 by gyungchaehan)

## [0.1.7]

### Changed

- Update codemirror-helix to 0.2.0

### Fixed

- Match-surround not working (#9)
- Bar-cursor padding causing confusion (#10)

## [0.1.6]

### Added

- Setting to change the cursor type appearing in insert mode. The default is a "bar" cursor, like in Obsidian with Vim bindings.

### Changed

- Update codemirror-helix to 0.0.9

## [0.1.5]

### Changed

- Update codemirror-helix to 0.0.6 (truly)

## [0.1.4]

### Changed

- Update codemirror-helix to 0.0.6

## [0.1.3]

### Fixed

- Missing CM6 dependency causing failing build

## [0.1.2]

### Changed

- Reload no longer needed to enable or disable the bindings
- Update to codemirror-helix 0.0.5

## [0.1.1]

### Changed

- Update to codemirror-helix 0.0.4

## [0.1.0]

### Added

- Enable Helix keybindings in plugin settings
- Command to toggle Helix keybindings
