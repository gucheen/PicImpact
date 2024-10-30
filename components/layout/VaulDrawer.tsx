'use client'

import { Drawer } from 'vaul'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import {
  LayoutGrid,
  SunMedium,
  MoonStar,
  LogIn,
  Home,
  MonitorDot,
  GalleryHorizontalEnd,
  LogOut,
} from 'lucide-react'
import { loginOut } from '~/server/actions'
import { DataProps, AlbumType } from '~/types'

export default function VaulDrawer(props: Readonly<DataProps>) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  const activeClasses = 'bg-gray-100 text-black'

  return (
    <Drawer.Root>
      <Drawer.Trigger className="focus-visible:outline-none">
        <LayoutGrid size={20} aria-label="菜单" className="rounded dark:text-white" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background focus-visible:!outline-none">
          <div className="p-4 bg-white dark:bg-zinc-800 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-2" />
            <div className="flex flex-col gap-4">
              <div className="w-full px-1 py-2 rounded-small">
                {
                  session ?
                    <Listbox
                      aria-label="移动端菜单"
                    >
                      <ListboxItem
                        key="home"
                        startContent={<Home size={20} className={iconClasses} />}
                        onClick={() => router.push('/')}
                        className={pathname === '/' ? activeClasses : ''}
                      >
                        <Drawer.Close className="w-full text-left">
                          首页
                        </Drawer.Close>
                      </ListboxItem>
                      {Array.isArray(props.data) && props.data?.map((album: AlbumType, index: any, array: AlbumType[]) => (
                        <ListboxItem
                          key={album.id}
                          startContent={<GalleryHorizontalEnd size={20} className={iconClasses} />}
                          onClick={() => router.push(album.album_value)}
                          className={pathname === album.album_value ? activeClasses : ''}
                        >
                          <Drawer.Close className="w-full text-left">
                            {album.name}
                          </Drawer.Close>
                        </ListboxItem>
                      ))}
                      <ListboxItem
                        key="admin"
                        startContent={<MonitorDot size={20} className={iconClasses} />}
                        onClick={() => router.push('/admin')}
                        className={pathname === '/admin' ? activeClasses : ''}
                        showDivider
                      >
                        <Drawer.Close className="w-full text-left">
                          控制台
                        </Drawer.Close>
                      </ListboxItem>
                      <ListboxItem
                        key="theme"
                        startContent={theme === 'light' ? <MoonStar size={20} className={iconClasses} /> : <SunMedium size={20} className={iconClasses} />}
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      >
                        { theme === 'light' ? '切换至⌈常夜⌋' : '切换至⌈白夜⌋' }
                      </ListboxItem>
                      <ListboxItem
                        key="loginOut"
                        startContent={<LogOut size={20} className={iconClasses} />}
                      >
                        <div onClick={async () => {
                          try {
                            await loginOut()
                            setTimeout(() => {
                              location.replace('/login')
                            }, 1000);
                          } catch (e) {
                            console.log(e)
                          }
                        }}>
                          退出登录
                        </div>
                      </ListboxItem>
                    </Listbox>
                    :
                    <Listbox
                      aria-label="移动端菜单"
                    >
                      <ListboxItem
                        key="home"
                        onClick={() => router.push('/')}
                        startContent={<Home size={20} className={iconClasses} />}
                        className={pathname === '/' ? activeClasses : ''}
                      >
                        <Drawer.Close className="w-full text-left">
                          首页
                        </Drawer.Close>
                      </ListboxItem>
                      <ListboxItem
                        key="theme"
                        startContent={theme === 'light' ? <MoonStar size={20} className={iconClasses} /> : <SunMedium size={20} className={iconClasses} />}
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      >
                        { theme === 'light' ? '切换至⌈常夜⌋' : '切换至⌈白夜⌋' }
                      </ListboxItem>
                      <ListboxItem
                        key="login"
                        onClick={() => router.push('/login')}
                        startContent={<LogIn size={20} className={iconClasses} />}
                      >
                        登录
                      </ListboxItem>
                    </Listbox>
                }
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-zinc-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">
              <a
                className="text-xs text-zinc-600 flex items-center gap-0.25"
                href="https://github.com/besscroft/PicImpact"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}