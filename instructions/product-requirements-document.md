# Product Requirements Document (PRD)

## 1. Product Overview
Mono revolutionizes workspace management by seamlessly integrating note-taking and task management into a unified platform. By eliminating the inefficiencies of context-switching between separate tools, Mono enables users to manage both information and tasks in one place, enhancing productivity and streamlining workflows. Its AI-powered features assist in capturing, analyzing, and breaking down tasks, making it easier for users to stay organized and efficient in their daily tasks and projects.

## 2. Target Audience
### 2.1 Core Users
Mono is designed for individuals who require efficient note-taking and task management, particularly those in industries that prioritize continuous learning and knowledge development. These users typically:
- Work in fields that demand regular updates to their knowledge systems, such as product managers and software developers.
- Value lifelong learning and are driven to improve their personal note-taking and productivity systems.

### 2.2 Example Use Cases
#### Product Managers:
- Recording notes during product analysis and design.
- Drafting requirements documents.
- Linking development tasks with associated notes for better project management.

#### Software Developers:
- Documenting issues encountered during the development process.
- Maintaining iterative records of project changes.
- Writing learning notes for new technologies and methods, directly associated with their development tasks.

## 3. Core Features
### 3.1 Note-Taking
- Create and manage notes in a Markdown-based format.
- Support for linking notes to each other with backlink functionality, enabling bidirectional referencing.

### 3.2 Task Management
- Create and manage tasks in a project-based structure.
- Assign start dates, due dates, and notification reminders for tasks.

### 3.3 Note-Task Integration
- Link notes to tasks or projects to provide context and background information, creating a seamless connection between related content.
- Link tasks or projects to relevant notes to ensure knowledge continuity, allowing for easy reference to necessary background information.
- **Backlink functionality**: Backlinks provide clickable references between notes and tasks, creating a dynamic network of interlinked content that makes it easy to navigate between related notes, tasks, and projects.

### 3.4 AI Assistance
#### Note-Taking Support:
- Assist users in analyzing new topics by identifying core questions.
- Help users create related notes based on these questions.

#### Task Management Support:
- Decompose complex tasks into smaller, actionable subtasks.
- Suggest related notes and tasks for user reference while creating or managing tasks.

## 4. User Interface
### Design Principles:
- Clean and minimalistic, displaying only essential information.
- Adheres to general design standards, inspired by macOS software UI and Linear's design style.

### Specific References:
- **Obsidian (Note-Taking)**: Content area, clean layout for easy navigation.
- **Heptabase (Note-Taking)**: Sidebar design for quick access to projects.
- **Things (Task Management)**: Sidebar and task detail view, providing a clear structure for task management.
- **Zed (Code Editor)**: Status bar, title bar, assistant panel for streamlined interaction.
- **VS Code (Code Editor)**: Status bar and chat panel for efficient workspace management.

## 5. Navigation and Linking
### Organization:
- Notes and tasks are managed within projects.
- Projects can contain both notes and tasks, providing a unified structure for organizing content.

### Linking:
- Notes, tasks, and projects can reference each other using a backlink mechanism inspired by Obsidian.
- This creates a dynamic and interconnected system where users can quickly trace relevant notes and tasks.

### Navigation History:
- The app maintains a record of the user's current position and browsing history.
- Users can navigate forward or backward through history, similar to jump navigation in code editors or back/forward functionality in browsers.
- Back and forward buttons will be displayed in the navigation bar, with keyboard shortcuts available for quick navigation.

## 6. AI Functionalities
### Core Objectives
#### Knowledge Network Creation:
- Assist users in linking notes to build a connected knowledge network.
- Prompt users to create linked notes if the referenced notes do not yet exist.

#### Task Assistance:
- Help users decompose complex tasks into manageable steps.
- Provide guidance for task completion and suggest relevant content, ensuring tasks are contextually enriched with necessary information.

### Dynamic Interaction:
- The help panel dynamically updates its content based on the user's current activity, offering tailored assistance for note-taking or task management.

### Purpose-Built Design:
- AI features are specifically designed to assist with linking content and breaking down tasks, enhancing productivity and knowledge integration.
- These features intentionally focus on actionable insights rather than providing autocomplete suggestions during note editing or prioritizing tasks automatically.

### Future Possibilities:
- Additional AI capabilities, such as more advanced contextual analysis or user-driven feature enhancements, may be introduced based on user feedback and evolving needs.

## 7. Customization and Personalization
### Theme Selection:
- Users can choose from a list of predefined themes or create custom themes (inspired by Linear).
- Themes automatically adapt to the system's light or dark mode settings, ensuring a seamless visual experience.

### Keyboard Shortcuts:
- Shortcut configurations are inspired by VS Code and include support for Vim mode, which users can enable or disable as needed.
- The app respects platform-specific default shortcuts, such as Cmd + S for saving content on macOS.

### Layout Customization:
- Users can personalize their workspace by toggling the visibility of UI elements, such as the status bar, sidebar, or help panel, to streamline their workflow.
- These configuration options enable users to focus on what matters most while maintaining flexibility for different working styles.

## 8. Offline and Online Capabilities
### Offline Usage:
- All data is stored locally, ensuring users can fully utilize note-taking and task management features without an internet connection.
- Basic AI functionalities, such as suggesting links between content, remain available offline, providing uninterrupted support for productivity.
- Synchronization is unavailable in offline mode.

### Online Usage:
- Online mode unlocks advanced AI capabilities, such as internet-based searches and API-powered model interactions, offering users enriched assistance for complex tasks and knowledge exploration.
- Synchronization ensures seamless access to data across multiple devices, maintaining consistency for all tasks and notes in real-time.

## 9. Data Export
### Notes:
- Exported as Markdown files. The exported notes do not include a front matter section, ensuring a clean and straightforward Markdown format.

### Tasks:
- Exported as Markdown files, with task details such as start dates and due dates included in the front matter section of each file.

This approach ensures compatibility with popular Markdown-based tools while keeping the exported data structured and accessible.

## 10. Data Security and Privacy
- All content is stored locally in file format, ensuring that users have full control over their data.
- The app does not upload any user data to external servers.
- Local data is not encrypted; users are responsible for managing and securing their own data.
- The app respects user privacy and does not collect any personal information or behavior analytics.
- Synchronization and advanced AI functionalities are only available online, with full privacy protections in place for offline use.

## 11. Platform Support
- macOS
- Windows
- Linux

Mono is designed to provide a consistent experience across all supported platforms, with features optimized for each operating system.

## 12. Localization and Language Support
- Users can select their preferred language in the app's settings.
- Initially supported languages: English and Simplified Chinese.
- Future updates will include support for additional languages based on user demand.

## 13. User Feedback and Analytics
- The app does not actively collect user behavior data.
- Users can report issues via a feedback button in the app settings, which redirects them to the app's website.
- **Privacy Note**: All feedback submissions are voluntary, and no identifiable data is collected during the process. This ensures that user feedback is collected in a transparent and privacy-respecting manner.
