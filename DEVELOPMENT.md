# Development Guide

## Code Structure

### Components (`/components`)
Reusable UI components with TypeScript props.

```tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}
```

### Pages (`/pages`)
Next.js file-based routing. Dynamic routes use `[id].tsx`.

```tsx
export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  // Component logic
}
```

### State Management (`/lib/store.ts`)
Zustand store for global state (cart, auth, orders).

```tsx
const { cart, addToCart, removeFromCart } = useAppStore();
```

### Types (`/lib/types.ts`)
Shared TypeScript interfaces.

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Beer' | 'Wine' | 'Spirits' | 'RTDs' | 'Snacks';
}
```

## Common Tasks

### Add a New Page

1. Create `pages/new-page.tsx`
2. Import components
3. Use `useRouter()` for navigation
4. Export default component

### Add a Component

1. Create `components/NewComponent.tsx`
2. Define TypeScript props interface
3. Build component
4. Export
5. Import in pages

### Update Colors

Edit `tailwind.config.js` theme colors.

### Modify State

Edit `lib/store.ts` to add/update state actions.

## Best Practices

✅ Use TypeScript for type safety
✅ Keep components small & reusable
✅ Use Tailwind classes (avoid CSS files)
✅ Handle loading & error states
✅ Test on mobile (375px viewport)
✅ Use semantic HTML
✅ Follow accessibility (ARIA labels)

## Debugging

```bash
# Browser DevTools
# Chrome: Cmd+Opt+I (Mac) | Ctrl+Shift+I (Windows)

# Next.js Debug
export DEBUG=*
npm run dev

# React DevTools Extension
# Download from Chrome Web Store
```

## Performance

- Image optimization: Use `<Image>` from `next/image`
- Code splitting: Automatic per route
- Bundle analysis: `npm install -g next-bundle-analyzer`
- Lighthouse: Chrome DevTools → Lighthouse tab

## Git Workflow

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature
# Create PR on GitHub
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org)