import { GetServerSidePropsContext } from 'next'

export  function getExpressSession(ctx: GetServerSidePropsContext): string | undefined{

  //get client cookie
    const sCookie = 'session';
    const session = ctx.req.cookies[sCookie];
    console.log("session=> "+ session);
  return `session=${session}`
}


export  function getExpressSessionFromReq(req:any): string | undefined{

  //get client cookie
    const sCookie = 'session';
    const session = req.cookies[sCookie];
    if (!session) {
      //get form local storage
      const cookie = JSON.parse(localStorage.getItem('cookie') || '{}');
      const session = cookie[sCookie];
      console.log("session=> "+ session);
      return `session=${session}`
    }
    console.log("session=> "+ session);
  return `session=${session}`
}