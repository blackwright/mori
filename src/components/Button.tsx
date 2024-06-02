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
  hover:bg-slate-100/20
  active:bg-slate-200/10
  disabled:(
    cursor-not-allowed
    opacity-50 
  )
`;
