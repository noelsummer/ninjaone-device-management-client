import Loading from "@components/Loading"

interface ListProps {
  loading: boolean
  title?: string
  items: any[]
  ItemComponent: (item: any) => JSX.Element
}

export const List = ({ loading, title, items, ItemComponent }: ListProps) => {
  return (
    <div className="text-gray-600">
      {title && (
        <h2 className="w-full border-b-[1px] border-gray-300 px-2 py-1 text-base md:px-4 md:py-2">
          {title}
        </h2>
      )}
      <div className="flex items-center justify-center">
        {loading ? (
          <Loading />
        ) : items.length ? (
          <div className="w-full">
            {items.map((item, index) => (
              <ItemComponent key={item?.id ?? index} item={item} />
            ))}
          </div>
        ) : (
          <span className="p-2 text-center md:p-4">Nothing to display.</span>
        )}
      </div>
    </div>
  )
}

export default List
