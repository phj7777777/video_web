import Image from './Image'
import Link from './Link'
import formatDate from '@/lib/utils/formatDate'

const CategoryCard = ({ title, description, imgSrc, href, date }) => (
  <div className=" p-2 " style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }   overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-contain md:h-36 lg:h-48"
              width={544}
              height={480}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-contain object-contain  md:h-36 lg:h-48"
            width={544}
            height={480}
          />
        ))}

      <div className="">
        {' '}
        <div className="p-2 pb-4">
          <h5 className="h5 font-light leading-none">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h5>
        </div>
      </div>
    </div>
  </div>
)

export default CategoryCard
