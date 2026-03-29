import PageTitle from '@/components/ui/pageTitle/PageTitle'
import styles from './styles.module.css'
import Image from 'next/image'
import { Music, Pause, Play, Plus } from 'lucide-react'
import { useChooseTrack } from '@/store/useChooseTrack'
import Collecetion from '@/components/widgets/collection/Collecetion'
import CollectionCreate from '@/components/widgets/collection/CollectionCreate'
import CollectionList from '@/components/widgets/collectionList/CollectionList'

export default function Collections () {
    return (
        <div className={styles.wrapper}>
            <PageTitle>Мои плейлисты</PageTitle>
            <CollectionList />
        </div>
    )
}