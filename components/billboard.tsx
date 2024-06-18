import { Billboard as BillboardType } from '@/types'

interface BillboardProps {
  data: BillboardType
}

export const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="w-full md:h-screen h-[500px] overflow-hidden">
      <div
        className="relative w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs z-10 text-white">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  )
}
