import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { LeftArrow, RightArrow } from '@/components/Arrow'
import Link from '@/components/Link'
import Image from '@/components/Image'
import formatDate from '@/lib/utils/formatDate'
import projectsData from '@/data/projectsData'

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }))

export default function Latest() {
  const [items, setItems] = React.useState(getItems)
  const [selected, setSelected] = React.useState([])
  const [position, setPosition] = React.useState(0)

  const isItemSelected = (id) => !!selected.find((el) => el === id)

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id)

      setSelected((currentSelected) =>
        itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id)
      )
    }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {projectsData.map((d) => (
        <Card
          key={d.title}
          title={d.title}
          description={d.description}
          imgSrc={d.imgSrc}
          href={d.href}
          date={d.date ?? '2018-08-15'}
          onClick={handleClick(d.title)}
        />
      ))}
    </ScrollMenu>
  )
}

function Card({ onClick, title, imgSrc, href, date }) {
  const visibility = React.useContext(VisibilityContext)

  return (
    <div
      className=" p-2 "
      style={{ minWidth: '180px', maxWidth: '544px', maxHeight: '200px' }}
      onClick={() => onClick(visibility)}
    >
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
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
      </div>
    </div>
  )
}
