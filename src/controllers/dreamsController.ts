import { Request, Response } from 'express';

// Methods for /dreams Get, Post and Delete
export const dreams_getAll = (req: Request, res: Response) => {
  res.json('Getting all dreams');
}

export const dreams_postAll = (req: Request, res: Response) => {
  res.json('Posting all dreams');
}

export const dreams_deleteAll = (req: Request, res: Response) => {
  res.json('Deleting all dreams');
}

// Methods for specific dream
export const dreams_get = (req: Request, res: Response) => {
  res.json('Getting one dream');
}

export const dreams_patch = (req: Request, res: Response) => {
  res.json('Updating one dream');
}

export const dreams_delete = (req: Request, res: Response) => {
  res.json('Deleting one dream');
}