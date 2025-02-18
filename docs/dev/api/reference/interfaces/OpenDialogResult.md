---
title: Docker extension API reference
description: Docker extension API reference
keywords: Docker, extensions, sdk, API, reference
---

# Interface: OpenDialogResult

## Table of contents

### Properties

- [canceled](OpenDialogResult.md#canceled)
- [filePaths](OpenDialogResult.md#filepaths)
- [bookmarks](OpenDialogResult.md#bookmarks)

## Properties

### canceled

• `Readonly` **canceled**: `boolean`

Whether the dialog was canceled.

___

### filePaths

• `Readonly` **filePaths**: `string`[]

An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.

___

### bookmarks

• `Optional` `Readonly` **bookmarks**: `string`[]

macOS only- An array matching the filePaths array of base64 encoded strings which contains security scoped bookmark data. securityScopedBookmarks must be enabled for this to be populated
