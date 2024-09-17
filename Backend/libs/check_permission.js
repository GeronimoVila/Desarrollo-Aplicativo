import { ForbiddenError } from './forbidden_error.js';

export function checkPermission (req, rol){
    const roles = req.user?.roles?.split(',').map(i => i.trim());
      if (!roles||!roles.include('role')){
        throw new ForbiddenError();
      }
  }