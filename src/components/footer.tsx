import Link from "next/link"


export const Footer = () => {
  return (
    <div className="min-w-full h-auto py-1.5 px-4 border-t border-gray-200 flex justify-between  md:text-sm text-xs">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-1">
        <p className=" text-gray-400">Powered by</p> <strong className="text-black">OpenRouterAI</strong>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <p className=" text-gray-400">Fork at </p> 
        <Link href="https://github.com/psantosh16/RepoPilot" target="_blank" className="cursor-pointer text-black font-semibold hover:text-black/60 ease-linear duration-100 transition-opacity"> Github </Link>
      </div>
    </div>
  )
}
