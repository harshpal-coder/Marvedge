import { Request, Response, NextFunction } from 'express';
// Auth middleware stub (no database)

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // No-op: always allow
  next();
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // No-op: always allow
    next();
  };
}
// Removed duplicate import statement
