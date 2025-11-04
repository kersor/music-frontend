import TrackList from "@/components/widgets/trackList/TrackList";
import styles from './styles.module.css'
import SearchAndAddMyMusic from "@/components/widgets/profile/searchAndAddMyMusic/SearchAndAddMyMusic";

export default function MyMusic() {
    return (
        <div className={styles.wrapper}>
            <SearchAndAddMyMusic />
            <div className="mt-5">
                 <TrackList />
            </div>
        </div>
    )
}