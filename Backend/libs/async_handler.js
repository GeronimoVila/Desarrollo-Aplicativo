export function asyncHandler(controller, method){
    return(req,res,next) => {
    (new controller)[method](req,res)
      .catch(next);
  };
}

