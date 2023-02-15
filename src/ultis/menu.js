import icons from './icons'

const { MdOutlineLibraryMusic } = icons
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
    icon: <MdOutlineLibraryMusic size={20} />
  },
  {
    path: 'zing-chart',
    text: '#zingchart',
    icon: <MdOutlineLibraryMusic size={20} />
  },
  {
    path: 'radio',
    text: 'Radio',
    icon: <MdOutlineLibraryMusic size={20} />,
    popup: true
  },
  {
    path: 'follow',
    text: 'Theo Dõi',
    icon: <MdOutlineLibraryMusic size={20} />
  },
]