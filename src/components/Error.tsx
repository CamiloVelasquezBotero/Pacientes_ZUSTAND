
export default function Error({children}: {children: React.ReactNode}) {
  return (
    <p className="text-center mt-1 bg-red-600 text-white font-bold p-1 uppercase text-sm">{children}</p>
  )
}
