# Rowing Calculator

A comprehensive web application for rowing performance calculations. Built with React and Chakra UI, this calculator helps rowers and coaches calculate various performance metrics.

## Project Status

This project uses [pnpm](https://pnpm.io/) for package management and Node.js 22.x as the Long Term Support (LTS) version.

## CI/CD Pipeline

- **Tests**: The pipeline tests the application on multiple Node.js versions including 20.x and 22.x.
- **Deploy**: On successful push to the `main` branch, the project is built and deployed to GitHub Pages using the latest stable Node.js version (22.x).

## Features

- **Split Time Calculator**: Convert total time and distance into 500m split times
- **Total Time Calculator**: Calculate total time from split times and distance
- **Watts per Kilogram**: Calculate power-to-weight ratio with support for kg/lbs

## Live Demo

Visit [Rowing Calculator](https://kruton.github.io/rowing-calculator) to try it out!

## Getting Started

### Prerequisites

- Node.js (v22.x)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kruton/rowing-calculator.git
   cd rowing-calculator
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:5175](http://localhost:5175) to view it in your browser

## Testing

Run the test suite:

```bash
pnpm test
```

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Chakra UI](https://chakra-ui.com/) - UI component library
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the rowing community for input on calculations and features
- Built using React and Vite template
