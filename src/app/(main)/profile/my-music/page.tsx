"use client"

import TrackList from "@/components/widgets/trackList/TrackList";
import styles from './styles.module.css'
import SearchAndAddMyMusic from "@/components/widgets/profile/searchAndAddMyMusic/SearchAndAddMyMusic";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { musicApi } from "@/lib/api/musicApi";
import { getIsAuth } from "@/utils/getIsAuth";

export default function MyMusic() {
    const [musics, setMusics] = useState([])

    const {data} = useQuery({
        queryKey: ['Music', getIsAuth()],
        queryFn: musicApi.getMe,
    })

    useEffect(() => {
        if (data) setMusics(data)
    }, [data])

    return (
        <div className={styles.wrapper}>
            <SearchAndAddMyMusic />
            <div className="mt-5">
                 <TrackList musics={musics} />
            </div>
        </div>
    )
}