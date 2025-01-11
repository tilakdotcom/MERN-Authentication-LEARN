export const oneYearFromNow = ():Date =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now in milliseconds


export const thirtyDaysFromNow = ():Date => (
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now in milliseconds
)


export const  FifteenMinutesFromNow = ():Date=>(
  new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now in milliseconds
)