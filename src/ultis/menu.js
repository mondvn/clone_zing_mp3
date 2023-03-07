import icons from './icons'

const { MdOutlineLibraryMusic, BiDisc, GiChart, FiRadio, MdOutlineFeed,
  CiMusicNote1, BiCategoryAlt, SlStar, MdMusicVideo } = icons
export const sidebarMainMenu = [
  {
    path: 'mymusic/song',
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
  // {
  //   path: 'radio',
  //   text: 'Radio',
  //   icon: <FiRadio size={20} />,
  //   popup: true
  // },
  // {
  //   path: 'follow',
  //   text: 'Theo Dõi',
  //   icon: <MdOutlineFeed size={20} />
  // },
]

export const sidebarSecondMenu = [
  {
    path: 'moi-phat-hanh',
    text: 'Nhạc Mới',
    icon: <CiMusicNote1 size={20} />
  },
  // {
  //   path: 'hub',
  //   text: 'Thể Loại',
  //   end: true,
  //   icon: <BiCategoryAlt size={20} />
  // },
  {
    path: 'top100',
    text: 'Top 100',
    icon: <SlStar size={20} />
  },
  // {
  //   path: 'the-loai-video',
  //   text: 'MV',
  //   icon: <MdMusicVideo size={20} />
  // }
]

export const searchMenu = [
  {
    path: 'tat-ca',
    text: 'TẤT CẢ',
  },
  {
    path: 'bai-hat',
    text: 'BÀI HÁT',
  },
  {
    path: 'playlist',
    text: 'PLAYLIST/ALBUM',
  },
  {
    path: 'artist',
    text: 'NGHỆ SĨ/OA',
  },
  // {
  //   path: 'video',
  //   text: 'MV',
  // }
]

export const myMusicMenu = [
  {
    text: 'BÀI HÁT',
    path: 'song',
  },
  {
    text: 'ALBUM/PLAYLIST',
    path: 'album',
  },

]