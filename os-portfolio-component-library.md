# OS-Style Portfolio Component Library

## 1. Core Components

### 1.1 Window
Props:
- title: string
- isActive: boolean
- onClose: function
- onMinimize: function
- onMaximize: function

### 1.2 Icon
Props:
- name: string
- icon: string (path to icon image)
- onClick: function

### 1.3 TaskbarItem
Props:
- name: string
- icon: string
- isActive: boolean
- onClick: function

### 1.4 StartMenu
Props:
- items: array of {name, icon, onClick}
- onClose: function

## 2. Layout Components

### 2.1 Desktop
Props:
- wallpaper: string (path to wallpaper image)
- icons: array of Icon props

### 2.2 Taskbar
Props:
- startMenu: StartMenu props
- items: array of TaskbarItem props

### 2.3 SystemTray
Props:
- items: array of {icon, onClick, tooltip}

## 3. Application Components

### 3.1 FileExplorer
Props:
- initialPath: string
- files: array of File objects

### 3.2 TextEditor
Props:
- initialContent: string
- onSave: function

### 3.3 ImageViewer
Props:
- imageSrc: string

### 3.4 PDFViewer
Props:
- pdfSrc: string

## 4. Utility Components

### 4.1 ContextMenu
Props:
- items: array of {label, onClick}
- position: {x, y}

### 4.2 Tooltip
Props:
- content: string
- position: 'top' | 'right' | 'bottom' | 'left'

### 4.3 Modal
Props:
- isOpen: boolean
- onClose: function
- children: React.Node

### 4.4 Dropdown
Props:
- options: array of {label, value}
- onChange: function
- value: any

## 5. Form Components

### 5.1 Button
Props:
- variant: 'primary' | 'secondary' | 'text'
- onClick: function
- disabled: boolean

### 5.2 Input
Props:
- type: 'text' | 'password' | 'number' | 'email'
- value: string
- onChange: function
- placeholder: string

### 5.3 Checkbox
Props:
- checked: boolean
- onChange: function
- label: string

### 5.4 RadioGroup
Props:
- options: array of {label, value}
- value: any
- onChange: function

## 6. Feedback Components

### 6.1 Toast
Props:
- message: string
- type: 'success' | 'error' | 'warning' | 'info'
- duration: number

### 6.2 ProgressBar
Props:
- progress: number (0-100)
- variant: 'determinate' | 'indeterminate'

### 6.3 Skeleton
Props:
- variant: 'text' | 'circular' | 'rectangular'
- width: number | string
- height: number | string

