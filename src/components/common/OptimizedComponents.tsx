import React, { memo } from 'react';

// Higher-order component for memoization with custom comparison
export function createMemoizedComponent<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  propsAreEqual?: (prevProps: T, nextProps: T) => boolean
) {
  return memo(Component, propsAreEqual);
}

// Custom hook for expensive computations
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  // This is a wrapper around useMemo for better readability
  return React.useMemo(factory, deps);
}

// Lazy loading wrapper
export function createLazyComponent(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) {
  return React.lazy(importFunc);
}
