"use client"

import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";
import { Button } from "@/components/ui/button/Button";
import Track from "@/components/widgets/track/Track";
import TrackList from "@/components/widgets/trackList/TrackList";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div>
      <TrackList />
    </div>
  );
}
