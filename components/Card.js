import Image from './Image'
import Link from './Link'
import formatDate from '@/lib/utils/formatDate'

const Card = ({ title, description, imgSrc, href, date }) => (
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
              className="object-contain object-center md:h-36 lg:h-48"
              width={544}
              height={480}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-contain object-center md:h-36 lg:h-48"
            width={544}
            height={480}
          />
        ))}

      <div className="flex h-full h-full flex-1 flex-col justify-between">
        {' '}
        <div className="px-2">
          <h5 className="h5 font-light leading-none">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h5>

          <dl className="py-2">
            <dt className="sr-only">Published on</dt>
            <p className="text-xs">
              <time dateTime={date}>{formatDate(date)}</time>
            </p>
          </dl>
        </div>
      </div>
    </div>
  </div>
)

export default Card
