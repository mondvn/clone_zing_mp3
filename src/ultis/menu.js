import icons from './icons'

const { MdOutlineLibraryMusic, BiDisc, GiChart, FiRadio, MdOutlineFeed } = icons
export const sidebarMenu = [
  {
    path: 'mymusic',
    text: 'Cá Nhân',
    icon: <MdOutlineLibraryMusic size={20} />
  },
  {
    path: '',
    text: 'Khám Phá',
    end: true,
    icon: <BiDisc size={20} />
  },
  {
    path: 'zing-chart',
    text: '#zingchart',
    icon: <GiChart size={20} />
  },
  {
    path: 'radio',
    text: 'Radio',
    icon: <FiRadio size={20} />,
    popup: true
  },
  {
    path: 'follow',
    text: 'Theo Dõi',
    icon: <MdOutlineFeed size={20} />
  },
]