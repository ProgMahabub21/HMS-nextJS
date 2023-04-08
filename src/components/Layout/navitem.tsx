import React from 'react'
import { useRouter } from 'next/router'
import { MdOutlineArrowDropDown } from 'react-icons/md'

interface Props {
    title: string;
    icon: JSX.Element;
    link?: string;
    navItems?: {
        name: string;
        link: string;
    }[]
}

const NavItem = ({ navItems, icon, title, link }: Props) => {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const handleOpen = () => {
        if (!navItems?.length) {
            link && router.push(link)
        }
        else setOpen(!open)
    }

    let content = open && <ul id="dropdown-example" className="py-2 space-y-2">
        {
            navItems?.map((item, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => router.push(item.link)} className="flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <div className="flex-1 ml-3 text-left whitespace-nowrap">{item.name}</div>
                        </button>
                    </li>
                )
            })
        }
    </ul>

    // if (!children) {
    //     if (!link) {
    //         throw new Error('link prop is required if children is not present')
    //     }
    // }




    return (
        <li>
            <button onClick={handleOpen} type="button" className="flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" >
                <div className='flex items-center'>
                    <div>{icon}</div>
                    <div className="flex-1 ml-3 text-left whitespace-nowrap" >{title}</div>
                </div>
                <div>
                    {
                        navItems?.length && <MdOutlineArrowDropDown className="w-5 h-5 text-gray-400 transition duration-75 transform group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-400" />
                    }
                </div>

            </button>
            {
                content
            }
        </li >
    )
}

export default NavItem