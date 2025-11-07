"use client"

import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";
import { Button } from "@/components/ui/button/Button";
import Track from "@/components/widgets/track/Track";
import TrackList from "@/components/widgets/trackList/TrackList";
import { musicApi } from "@/lib/api/musicApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [musics, setMusics] = useState([])

  const {data} = useQuery({
      queryKey: ['Music'],
      queryFn: musicApi.getAll,
  })

  useEffect(() => {
      if (data) setMusics(data)
  }, [data])

  return (
    <div>
      <TrackList musics={musics}/>
    </div>
  );
}
