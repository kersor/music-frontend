import { ChevronRight, EllipsisVertical, Heart, Pause, Play, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { memo, useState } from 'react'
import styles from './styles.module.css'
import { IMusic } from '@/types/music.type'
import { useChooseTrack } from '@/store/useChooseTrack'
import clsx from 'clsx'
import { formatTime } from '@/utils/format/formatTime'
import { ButtonIcon } from '@/components/ui/button/ButtonIcon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu/DropdownMenu'

interface Props {
    collections: any[]
    music: IMusic
    playlist: IMusic[]
    funncTogglePlay: (music: IMusic, playlist: IMusic[]) => void
    funcCreateNewCollection: () => void
    funcAddMusicInCollection: (collectionId: string, musicId: string) => void
}

const Track = ({
    collections,
    music,
    playlist,
    funncTogglePlay,
    funcCreateNewCollection,
    funcAddMusicInCollection
}: Props) => {
    const [isHover, setIsHover] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const trackId = useChooseTrack(state => state.track?.id)
    const isPlay = useChooseTrack(state => state.options.isPlay)

    const time = formatTime(music.duration)

    const IconPlay = () => {
        if (trackId !== music.id) {
            return (
                <button onClick={() => funncTogglePlay(music, playlist)} className={styles.track_icon}>
                    <div className='flex items-center justify-center w-full h-full rounded-full bg-white'>
                        <Play size={15} />
                    </div>
                </button>
            )
        }

        return (
            <button
                onClick={() => funncTogglePlay(music, playlist)}
                className={clsx(
                    styles.track_icon,
                    trackId === music.id && styles.track_icon__visible
                )}
            >
                <div
                    className={clsx(
                        styles.track_icon__play,
                        'rounded-full bg-white',
                        isPlay ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <div className={styles.track_icon__circle_inner} />
                </div>

                <div
                    className={clsx(
                        styles.track_icon__hst,
                        !isPlay && 'bg-white rounded-full'
                    )}
                >
                    {isPlay ? <Pause size={15} /> : <Play size={15} />}
                </div>
            </button>
        )
    }

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={styles.track}
        >
            <div className='grid grid-cols-[90%_10%] items-center text-sm justify-between relative'>
                <div className='flex gap-2'>
                    <div className='relative w-10 h-10'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_MEDIA}/${music.image}`}
                            alt='photo'
                            fill
                            objectFit='cover'
                            className='rounded-md'
                        />
                        <IconPlay />
                    </div>
                    <div className='font-bold'>
                        <div className=' text-[#504f4f]'>{music.name}</div>
                        <div>{music.author.name}</div>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <Heart size={20} />
                    <div className={styles.track_actions}>
                        <div
                            className={clsx(
                                styles.track_time,
                                (isHover || isMenuOpen) ? styles.track_time__hidden : styles.track_time__visible
                            )}
                        >
                            {time}
                        </div>
                        <div
                            className={clsx(
                                styles.track_menu,
                                (isHover || isMenuOpen) ? styles.track_menu__visible : styles.track_menu__hidden
                            )}
                        >
                            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <DropdownMenuTrigger asChild>
                                    <ButtonIcon size='md' classNames='rounded-lg!'>
                                        <div>
                                            <EllipsisVertical size={18} />
                                        </div>
                                    </ButtonIcon>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align='end' >
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className='min-w-[250px]'>
                                            Добавить в плейлист <ChevronRight />
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            {collections.length > 0 ? (
                                                collections.map(c => (
                                                    <DropdownMenuItem onClick={() => {
                                                        funcAddMusicInCollection(c.id, music.id)
                                                    }} key={c.id}>{c.name}</DropdownMenuItem>
                                                ))
                                            ) : (
                                                <DropdownMenuItem onClick={funcCreateNewCollection} className='flex min-w-[250px]'> <Plus /> Добавить новый плейлист</DropdownMenuItem>
                                            )}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Track)
