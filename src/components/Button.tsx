import tw from 'twin.macro';

export const Button = tw.button`
  relative
  flex
  items-center
  justify-center
  cursor-pointer
  py-0.5
  px-4
  min-w-8
  min-h-8
  border
  border-slate-100
  rounded
  text-slate-100
  bg-slate-200/10
  hover:bg-slate-200/40
  active:bg-slate-200/20
  disabled:(
    cursor-not-allowed
    opacity-50 
  )
`;
