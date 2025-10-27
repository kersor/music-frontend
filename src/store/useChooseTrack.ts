import { IMusic } from "@/types/music.type";
import { create } from "zustand";

const initTrack = null

const initOptions = {
    isPlay: false,
    duration: 0,
    progress: 0,
    volume: 0.5,
    isMute: false,
    isRepeat: false
}

interface IPlayer {
    track: IMusic | null
    playlist: IMusic[] | []
    options: {
        isPlay: boolean
        duration: number
        progress: number
        volume: number
        isMute: boolean
        isRepeat: boolean
    },
    actions: {
        setTrack: (track: IMusic, playlist: IMusic[]) => void,
        togglePlay: () => void,
        setPlay: (isPlay: boolean) => void,
        setDuration: (time: number) => void,
        setProgress: (time: number) => void,
        setVolume: (volume: number) => void,
        setMute: (isMute: boolean) => void,
        nextTrack: () => void,
        prevTrack: () => void,
        setRepeat: (isRepeat: boolean) => void,

        reset: () => void
    }
}

export const useChooseTrack = create<IPlayer>((set, get) => ({
    track: initTrack,
    playlist: [],
    options: {
        ...initOptions
    },
    actions: {
        setTrack: (track: IMusic, playlist: IMusic[]) => {
            set({
                playlist: playlist,
                track: track, 
                options: {
                    ...get().options,
                    isPlay: true,
                    progress: 0,
                    duration: track.duration
                }
            })
        },
        setDuration: (time: number) => {
            set({
                options: {
                    ...get().options,
                    duration: time
                }
            })
        },
        togglePlay: () => {
            const isPlay = get().options.isPlay

            set({
                options: {
                    ...get().options,
                    isPlay: !isPlay
                }
            })
        },
        setPlay: (isPlay: boolean) => {
            set({
                options: {
                    ...get().options,
                    isPlay: isPlay
                }
            })
        },
        setProgress: (time: number) => {
            set({
                options: {
                    ...get().options,
                    progress: time
                }
            })
        },
        setVolume: (time: number) => {
            set({
                options: {
                    ...get().options,
                    volume: time
                }
            })
        },
        setMute: (isMute: boolean) => {
            set({
                options: {
                    ...get().options,
                    isMute: isMute
                }
            })
        },
        setRepeat: (isRepeat: boolean) => {
            set({
                options: {
                    ...get().options,
                    isRepeat: isRepeat
                }
            })
        },
        nextTrack: () => {
            const playlist = get().playlist
            const track = get().track
            if (!playlist.length) return

            const currentIndex = playlist.findIndex(tr => tr.id === track?.id)
            const nextIndex = (currentIndex + 1 ) % playlist.length      
            
            set({
                track: playlist[nextIndex],
                options: {
                    ...get().options,
                    isPlay: true,
                    duration: playlist[nextIndex].duration,
                    progress: 0
                }
            })
        },

        prevTrack: () => {
            const playlist = get().playlist
            const track = get().track
            if (!playlist.length) return

            const currentIndex = playlist.findIndex(tr => tr.id === track?.id)
            const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length     
            
            set({
                track: playlist[prevIndex],
                options: {
                    ...get().options,
                    isPlay: true,
                    duration: playlist[prevIndex].duration,
                    progress: 0
                }
            })
        },

        reset: () => {
            set({
                track: initTrack,
                options: {
                    ...initOptions
                }
            })
        }
    }
}))