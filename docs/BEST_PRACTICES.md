# Project Structure Best Practices

## 📁 Folder Organization

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # React components
│   ├── common/     # Reusable UI components (Button, Input, etc.)
│   └── feature/    # Feature-specific components
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization configuration
├── pages/          # Page-level components (routes)
├── services/       # API services and external integrations
├── store/          # State management (Zustand stores)
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and helpers
    ├── constants.ts   # Constants and configuration
    ├── storage.ts     # localStorage wrapper
    ├── helpers.ts     # General utility functions
    └── errors.ts      # Error handling utilities
```

## 🎯 Best Practices

### 1. Component Organization
- **Common Components**: Reusable UI components with no business logic
- **Feature Components**: Components tied to specific features
- Keep components small and focused (Single Responsibility Principle)
- Use composition over inheritance

### 2. State Management
- **Local State**: Use `useState` for component-specific state
- **Global State**: Use Zustand for app-wide state (auth, settings)
- **Server State**: Use React Query for API data

### 3. Type Safety
- Always define TypeScript interfaces/types
- Export types from `types/index.ts`
- Use strict TypeScript configuration

### 4. Code Style
- Use ESLint and Prettier for consistent formatting
- Run `npm run lint:fix` before committing
- Follow the Airbnb style guide

### 5. Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `LoginCredentials`)

### 6. Import Order
```typescript
// 1. External libraries
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal absolute imports
import { Button } from '@/components';
import { useAuth } from '@/hooks';

// 3. Relative imports
import { formatDate } from '../utils';

// 4. Types
import type { User } from '@/types';

// 5. Styles/Assets
import './styles.css';
import logo from './logo.svg';
```

### 7. Error Handling
- Always handle errors in async functions
- Use try-catch blocks appropriately
- Display user-friendly error messages
- Log errors for debugging

### 8. Performance
- Use React.memo() for expensive components
- Implement code splitting with React.lazy()
- Optimize images and assets
- Use proper React Query caching strategies

### 9. Security
- Never commit sensitive data (.env files)
- Sanitize user inputs
- Implement proper authentication
- Use HTTPS in production

### 10. Testing (Future)
- Write unit tests for utilities
- Write integration tests for API services
- Write component tests with React Testing Library
- Aim for >80% code coverage

## 📝 Git Workflow

1. Create feature branch from `main`
2. Make small, focused commits
3. Write descriptive commit messages
4. Run linter before committing
5. Create PR for code review
6. Squash commits when merging

## 🚀 Deployment Checklist

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Linter passing
- [ ] Environment variables configured
- [ ] Build succeeds
- [ ] Performance tested
- [ ] Security audit completed
