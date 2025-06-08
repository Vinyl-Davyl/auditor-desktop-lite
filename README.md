# Auditor Desktop Lite

<p align="center">
  <img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9" alt="Electron">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

A modern desktop application built with Electron, React, TypeScript, and Tailwind CSS for analyzing and improving code quality. Auditor Desktop Lite helps developers identify potential issues, measure code complexity, and improve maintainability across JavaScript and TypeScript projects.

## Features

- 🔍 **Code complexity analysis**: Evaluate cyclomatic complexity of your code
- 📊 **Code quality metrics**: Measure maintainability and identify potential issues
- 🎨 **Beautiful, modern UI**: Clean interface with dark mode support
- ⚡ **Fast and responsive**: Analyze files quickly and efficiently
- 🔧 **Customizable analysis settings**: Adjust thresholds and parameters to match your project needs
- 📱 **Cross-platform support**: Works on Windows, macOS, and Linux

## Tech Stack

- **Electron**: Cross-platform desktop application framework
- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Redux Toolkit**: State management with simplified Redux logic
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Headless UI**: Unstyled, accessible UI components
- **Heroicons**: Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/code-auditor.git
cd code-auditor

# Install dependencies
npm install

# Start the application in development mode
npm run dev

# Build the application for production
npm run build

# Package the application for distribution
npm run package
```

## Project Structure

```
src/
├── main/           # Electron main process
├── preload/        # Preload scripts
├── renderer/       # React application
│   ├── components/ # React components
│   └── store/      # Redux store and slices
└── types/          # TypeScript type definitions
```

## Usage

1. Launch the application
2. Click the "Select Files" button in the Analysis tab
3. Choose JavaScript or TypeScript files to analyze
4. Review the analysis results, including:
   - Complexity metrics
   - Maintainability score
   - Lines of code
   - Potential issues and suggestions
5. Use the Settings tab to customize analysis parameters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features and ensure existing tests pass
- Update documentation as needed
- Keep pull requests focused on a single feature or bug fix
- Ensure your code works across all supported platforms (Windows, macOS, Linux)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
