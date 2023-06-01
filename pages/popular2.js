// pages/products.tsx
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import Image from 'next/image'
import useSWR from 'swr'
import Pagination from './populars'

const ProductsPage = () => {
  // 21-25 parse the page and perPage  from router.query
  const router = useRouter()
  const query = router.query
  const page = query.page ?? '1'
  const perPage = query.perPage ?? '12'

  // Lines 27-29: Define limit and skip which is used by DummyJSON API for pagination
  const limit = perPage
  const skip = (parseInt(page) - 1) * parseInt(limit)
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail`

  // Fetch the data using useSWR
  const { data, error } = useSWR(url, fetcher)

  // Define the fetcher function
  async function fetcher(url) {
    const response = await fetch(url)
    const data = await response.json()
    console.log(url)
    return data
  }

  return (
    // we use tailwindCSS classes to create a decent product grid

    // we use tailwindCSS classes to create a decent product grid
    <div className="container mx-auto">
      {!data && <div>Loading...</div>}
      <div className="grid grid-cols-3 gap-4 p-4 sm:grid-cols-2">
        {data?.products?.map((product) => {
          // render each product
          return (
            <a
              key={product.id}
              className="col-span-3 block overflow-hidden rounded-md shadow-md"
              href={`/products/${product.id}`}
            >
              <div className="relative aspect-video ">
                <Image
                  src={product.thumbnail}
                  layout={'fill'}
                  className="object-cover"
                  alt={product.title}
                />
              </div>
              <div className="flex justify-between p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </a>
          )
        })}
        <Pagination
          page={parseInt(page)}
          perPage={parseInt(perPage)}
          itemCount={data?.total ?? 0}
        />
      </div>
    </div>
  )
}
export default ProductsPage
